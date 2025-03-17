/**
 * Collection of mood patterns and activities for different weather conditions
 */
const moodPatterns = {
    Clear: {
        moods: [
            "energetic and optimistic",
            "inspired and creative",
            "peaceful and content",
            "adventurous and free-spirited"
        ],
        activities: [
            "go for a nature walk",
            "have a picnic in the park",
            "practice outdoor yoga",
            "start a new creative project"
        ]
    },
    Clouds: {
        moods: [
            "contemplative and thoughtful",
            "calm and focused",
            "dreamy and imaginative",
            "cozy and relaxed"
        ],
        activities: [
            "read a good book by the window",
            "write in your journal",
            "plan your next adventure",
            "catch up with an old friend"
        ]
    },
    Rain: {
        moods: [
            "introspective and peaceful",
            "creative and inspired",
            "cozy and nostalgic",
            "refreshed and renewed"
        ],
        activities: [
            "enjoy a warm cup of tea",
            "start that indoor project you've been planning",
            "listen to calming music",
            "write poetry or draw"
        ]
    },
    Snow: {
        moods: [
            "whimsical and playful",
            "serene and peaceful",
            "cozy and content",
            "magical and inspired"
        ],
        activities: [
            "build a snowman",
            "enjoy hot chocolate by the fire",
            "take winter photographs",
            "bake something warm and comforting"
        ]
    },
    Thunderstorm: {
        moods: [
            "dramatic and intense",
            "energized and excited",
            "mysterious and thoughtful",
            "cozy and protected"
        ],
        activities: [
            "write a story",
            "watch a thrilling movie",
            "do some indoor exercise",
            "try a new recipe"
        ]
    }
};

// Default patterns for unknown weather conditions
const defaultPatterns = {
    moods: [
        "adaptable and balanced",
        "curious and observant",
        "mindful and present",
        "open to new experiences"
    ],
    activities: [
        "practice mindfulness",
        "try something new",
        "connect with friends",
        "focus on self-care"
    ]
};

/**
 * Generates a personalized mood and activity suggestion based on weather condition
 * @param {string} condition - The current weather condition
 * @returns {string} A mood and activity suggestion
 */
export function generateMood(condition) {
    // Get the appropriate patterns for the weather condition, or use defaults
    const patterns = moodPatterns[condition] || defaultPatterns;
    
    // Randomly select a mood and activity
    const mood = patterns.moods[Math.floor(Math.random() * patterns.moods.length)];
    const activity = patterns.activities[Math.floor(Math.random() * patterns.activities.length)];
    
    // Generate a random connector phrase
    const connectors = [
        "Perfect weather to",
        "Why not",
        "This weather makes it ideal to",
        "You might enjoy to",
        "Consider taking time to"
    ];
    const connector = connectors[Math.floor(Math.random() * connectors.length)];
    
    // Construct the suggestion
    return `The weather is making you feel ${mood}. ${connector} ${activity}.`;
}

/**
 * Get all possible moods for a condition (useful for testing)
 * @param {string} condition - The weather condition
 * @returns {string[]} Array of possible moods
 */
export function getPossibleMoods(condition) {
    const patterns = moodPatterns[condition] || defaultPatterns;
    return patterns.moods;
}

/**
 * Get all possible activities for a condition (useful for testing)
 * @param {string} condition - The weather condition
 * @returns {string[]} Array of possible activities
 */
export function getPossibleActivities(condition) {
    const patterns = moodPatterns[condition] || defaultPatterns;
    return patterns.activities;
} 