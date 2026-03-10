import { createContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
    const [progressData, setProgressData] = useState(() => {
        const saved = localStorage.getItem('eduhub_progress');
        return saved ? JSON.parse(saved) : { lastActive: null, courses: {} };
    });

    useEffect(() => {
        localStorage.setItem('eduhub_progress', JSON.stringify(progressData));
    }, [progressData]);

    // Update last activity and increment progress mock
    const trackActivity = (courseId, courseTitle, materialId, materialTitle, totalMaterials = 1) => {
        setProgressData(prev => {
            const currentCourseProgress = prev.courses[courseId]?.progress || 0;
            // Mock logic: Increment by 1 step, max 100%. 
            // In real app, we'd calculate completed / total.
            // Here, we assume viewing a material adds "progress".
            const increment = Math.ceil(100 / (totalMaterials || 5));
            const newProgress = Math.min(100, currentCourseProgress + (prev.courses[courseId]?.lastMaterialId !== materialId ? increment : 0));

            return {
                ...prev,
                lastActive: {
                    courseId,
                    courseTitle,
                    materialId,
                    materialTitle,
                    timestamp: Date.now()
                },
                courses: {
                    ...prev.courses,
                    [courseId]: {
                        progress: newProgress,
                        lastMaterialId: materialId,
                        lastMaterialTitle: materialTitle
                    }
                }
            };
        });
    };

    const getCourseProgress = (courseId) => {
        return progressData.courses[courseId]?.progress || 0;
    };

    return (
        <ProgressContext.Provider value={{
            lastActive: progressData.lastActive,
            trackActivity,
            getCourseProgress
        }}>
            {children}
        </ProgressContext.Provider>
    );
};

export default ProgressContext;
