const Material = require('../models/Material');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @desc    Add material to a course
// @route   POST /api/materials
// @access  Private/Educator
const addMaterial = async (req, res, next) => {
    try {
        const { title, description, url, type, courseId } = req.body;

        const course = await Course.findById(courseId);

        if (!course) {
            res.status(404);
            throw new Error('Course not found');
        }

        if (course.educatorId.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to add material to this course');
        }

        const material = await Material.create({
            title,
            description,
            url,
            type,
            courseId
        });

        res.status(201).json(material);
    } catch (error) {
        next(error);
    }
};

// @desc    Get materials for a course
// @route   GET /api/materials/:courseId
// @access  Private
const getMaterials = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);

        if (!course) {
            res.status(404);
            throw new Error('Course not found');
        }

        // Access control
        if (req.user.role === 'educator') {
            if (course.educatorId.toString() !== req.user._id.toString()) {
                res.status(401);
                throw new Error('Not authorized to view these materials');
            }
        } else if (req.user.role === 'student') {
            const enrollment = await Enrollment.findOne({
                userId: req.user._id,
                courseId,
                status: { $in: ['approved', 'completed'] }
            });

            if (!enrollment) {
                res.status(401);
                throw new Error('Not authorized. You must be enrolled and approved to view materials.');
            }
        }

        const materials = await Material.find({ courseId });
        res.json(materials);
    } catch (error) {
        next(error);
    }
};

// @desc    Update material
// @route   PUT /api/materials/:id
// @access  Private/Educator
const updateMaterial = async (req, res, next) => {
    try {
        const { title, description, url, type } = req.body;
        const material = await Material.findById(req.params.id).populate('courseId');

        if (!material) {
            res.status(404);
            throw new Error('Material not found');
        }

        if (material.courseId.educatorId.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to update this material');
        }

        material.title = title || material.title;
        material.description = description || material.description;
        material.url = url || material.url;
        material.type = type || material.type;

        await material.save();
        res.json(material);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete material
// @route   DELETE /api/materials/:id
// @access  Private/Educator
const deleteMaterial = async (req, res, next) => {
    try {
        const material = await Material.findById(req.params.id).populate('courseId');

        if (!material) {
            res.status(404);
            throw new Error('Material not found');
        }

        if (material.courseId.educatorId.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to delete this material');
        }

        await Material.findByIdAndDelete(req.params.id);
        res.json({ message: 'Material removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addMaterial,
    getMaterials,
    updateMaterial,
    deleteMaterial
};
