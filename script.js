// Health app functionality
class HealthTracker {
    constructor() {
        this.waterConsumed = 0;
        this.waterGoal = 2.5;
        this.healthRecords = JSON.parse(localStorage.getItem('healthRecords') || '[]');
        this.healthTips = [
            "Stay hydrated! Drinking adequate water helps maintain your body's fluid balance and supports all vital functions.",
            "Get at least 7-9 hours of sleep each night for optimal health and cognitive function.",
            "Take a 10-minute walk after meals to help with digestion and blood sugar control.",
            "Practice deep breathing for 5 minutes daily to reduce stress and improve focus.",
            "Eat a rainbow of fruits and vegetables to ensure you get a variety of nutrients.",
            "Limit screen time before bed to improve sleep quality and duration.",
            "Stretch for 10 minutes every morning to improve flexibility and reduce stiffness.",
            "Practice mindfulness or meditation for mental well-being and stress reduction.",
            "Maintain good posture while working to prevent back and neck pain.",
            "Wash your hands frequently to prevent the spread of germs and infections.",
            "Take regular breaks from sitting every 30-60 minutes to improve circulation.",
            "Include protein in every meal to support muscle health and satiety."
        ];
        this.initializeApp();
    }

    initializeApp() {
        // Load saved water intake
        const savedWater = localStorage.getItem('waterConsumed');
        const savedGoal = localStorage.getItem('waterGoal');
        
        if (savedWater) {
            this.waterConsumed = parseFloat(savedWater);
        }
        
        if (savedGoal) {
            this.waterGoal = parseFloat(savedGoal);
            document.getElementById('water-goal').value = this.waterGoal;
        }

        this.updateWaterProgress();
        this.displayHealthRecords();
        this.displayRandomTip();

        // Add event listener for water goal changes
        document.getElementById('water-goal').addEventListener('change', (e) => {
            this.waterGoal = parseFloat(e.target.value) || 2.5;
            localStorage.setItem('waterGoal', this.waterGoal);
            this.updateWaterProgress();
        });
    }

    // BMI Calculator
    calculateBMI() {
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);

        if (!height || !weight || height <= 0 || weight <= 0) {
            alert('Please enter valid height and weight values.');
            return;
        }

        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        
        const resultDiv = document.getElementById('bmi-result');
        const bmiValue = document.getElementById('bmi-value');
        const bmiCategory = document.getElementById('bmi-category');
        const bmiDescription = document.getElementById('bmi-description');

        let category = '';
        let description = '';
        let color = '';

        if (bmi < 18.5) {
            category = 'Underweight';
            description = 'Consider consulting with a healthcare provider about healthy weight gain strategies.';
            color = '#3b82f6';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal weight';
            description = 'Great! You have a healthy weight. Maintain it with a balanced diet and regular exercise.';
            color = '#10b981';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            description = 'Consider incorporating more physical activity and a balanced diet into your routine.';
            color = '#f59e0b';
        } else {
            category = 'Obese';
            description = 'It would be beneficial to consult with a healthcare provider for personalized advice.';
            color = '#ef4444';
        }

        bmiValue.textContent = bmi.toFixed(1);
        bmiCategory.textContent = category;
        bmiCategory.style.color = color;
        bmiDescription.textContent = description;
        
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Water Intake Tracker
    addWater(amount) {
        this.waterConsumed += amount;
        if (this.waterConsumed > this.waterGoal * 2) {
            this.waterConsumed = this.waterGoal * 2; // Cap at 2x goal
        }
        localStorage.setItem('waterConsumed', this.waterConsumed);
        this.updateWaterProgress();
    }

    resetWater() {
        this.waterConsumed = 0;
        localStorage.setItem('waterConsumed', this.waterConsumed);
        this.updateWaterProgress();
    }

    updateWaterProgress() {
        const percentage = Math.min((this.waterConsumed / this.waterGoal) * 100, 100);
        const circumference = 2 * Math.PI * 52;
        const strokeDasharray = (percentage / 100) * circumference;

        document.getElementById('water-percentage').textContent = `${Math.round(percentage)}%`;
        document.getElementById('water-consumed').textContent = `${this.waterConsumed.toFixed(1)}L / ${this.waterGoal}L`;
        
        const progressFill = document.querySelector('.progress-ring-fill');
        progressFill.style.strokeDasharray = `${strokeDasharray} ${circumference}`;

        // Change color based on progress
        if (percentage >= 100) {
            progressFill.style.stroke = '#10b981'; // Green
        } else if (percentage >= 75) {
            progressFill.style.stroke = '#3b82f6'; // Blue
        } else if (percentage >= 50) {
            progressFill.style.stroke = '#f59e0b'; // Yellow
        } else {
            progressFill.style.stroke = '#ef4444'; // Red
        }
    }

    // Health Metrics Recording
    recordBloodPressure() {
        const systolic = parseInt(document.getElementById('systolic').value);
        const diastolic = parseInt(document.getElementById('diastolic').value);

        if (!systolic || !diastolic || systolic <= 0 || diastolic <= 0) {
            alert('Please enter valid blood pressure values.');
            return;
        }

        if (systolic <= diastolic) {
            alert('Systolic pressure should be higher than diastolic pressure.');
            return;
        }

        const record = {
            type: 'Blood Pressure',
            value: `${systolic}/${diastolic} mmHg`,
            timestamp: new Date().toISOString(),
            category: this.getBPCategory(systolic, diastolic)
        };

        this.addHealthRecord(record);
        document.getElementById('systolic').value = '';
        document.getElementById('diastolic').value = '';
    }

    recordHeartRate() {
        const heartRate = parseInt(document.getElementById('heart-rate').value);

        if (!heartRate || heartRate <= 0) {
            alert('Please enter a valid heart rate.');
            return;
        }

        const record = {
            type: 'Heart Rate',
            value: `${heartRate} bpm`,
            timestamp: new Date().toISOString(),
            category: this.getHRCategory(heartRate)
        };

        this.addHealthRecord(record);
        document.getElementById('heart-rate').value = '';
    }

    recordSleep() {
        const sleepHours = parseFloat(document.getElementById('sleep-hours').value);

        if (sleepHours === null || sleepHours < 0 || sleepHours > 24) {
            alert('Please enter valid sleep hours (0-24).');
            return;
        }

        const record = {
            type: 'Sleep',
            value: `${sleepHours} hours`,
            timestamp: new Date().toISOString(),
            category: this.getSleepCategory(sleepHours)
        };

        this.addHealthRecord(record);
        document.getElementById('sleep-hours').value = '';
    }

    addHealthRecord(record) {
        this.healthRecords.unshift(record);
        // Keep only last 50 records
        if (this.healthRecords.length > 50) {
            this.healthRecords = this.healthRecords.slice(0, 50);
        }
        localStorage.setItem('healthRecords', JSON.stringify(this.healthRecords));
        this.displayHealthRecords();
    }

    displayHealthRecords() {
        const historyList = document.getElementById('history-list');
        
        if (this.healthRecords.length === 0) {
            historyList.innerHTML = '<p class="no-data">No records yet. Start tracking your health metrics!</p>';
            return;
        }

        const recentRecords = this.healthRecords.slice(0, 10);
        historyList.innerHTML = recentRecords.map(record => {
            const date = new Date(record.timestamp).toLocaleDateString();
            const time = new Date(record.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            return `
                <div class="history-item">
                    <div>
                        <strong>${record.type}:</strong> ${record.value}
                        <br><small style="color: ${this.getCategoryColor(record.category)};">${record.category}</small>
                    </div>
                    <div class="history-item-date">${date} ${time}</div>
                </div>
            `;
        }).join('');
    }

    // Category helpers
    getBPCategory(systolic, diastolic) {
        if (systolic < 120 && diastolic < 80) return 'Normal';
        if (systolic <= 120 && diastolic < 80) return 'Normal';
        if (systolic < 130 && diastolic < 80) return 'Elevated';
        if (systolic < 140 || diastolic < 90) return 'High (Stage 1)';
        if (systolic < 180 || diastolic < 120) return 'High (Stage 2)';
        return 'Hypertensive Crisis';
    }

    getHRCategory(heartRate) {
        if (heartRate < 60) return 'Low';
        if (heartRate <= 100) return 'Normal';
        if (heartRate <= 120) return 'Elevated';
        return 'High';
    }

    getSleepCategory(hours) {
        if (hours < 6) return 'Insufficient';
        if (hours >= 7 && hours <= 9) return 'Optimal';
        if (hours > 9) return 'Excessive';
        return 'Adequate';
    }

    getCategoryColor(category) {
        const colors = {
            'Normal': '#10b981',
            'Optimal': '#10b981',
            'Elevated': '#f59e0b',
            'Adequate': '#3b82f6',
            'High': '#ef4444',
            'Low': '#ef4444',
            'Insufficient': '#ef4444',
            'Excessive': '#f59e0b',
            'High (Stage 1)': '#f59e0b',
            'High (Stage 2)': '#ef4444',
            'Hypertensive Crisis': '#dc2626'
        };
        return colors[category] || '#6b7280';
    }

    // Health Tips
    displayRandomTip() {
        const randomIndex = Math.floor(Math.random() * this.healthTips.length);
        document.getElementById('health-tip').innerHTML = `<p>${this.healthTips[randomIndex]}</p>`;
    }

    getNewTip() {
        this.displayRandomTip();
    }
}

// Global functions for HTML onclick events
let healthTracker;

function calculateBMI() {
    healthTracker.calculateBMI();
}

function addWater(amount) {
    healthTracker.addWater(amount);
}

function resetWater() {
    healthTracker.resetWater();
}

function recordBloodPressure() {
    healthTracker.recordBloodPressure();
}

function recordHeartRate() {
    healthTracker.recordHeartRate();
}

function recordSleep() {
    healthTracker.recordSleep();
}

function getNewTip() {
    healthTracker.getNewTip();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    healthTracker = new HealthTracker();
    
    // Add keyboard support for better accessibility
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const target = e.target;
            if (target.id === 'height' || target.id === 'weight') {
                calculateBMI();
            } else if (target.id === 'systolic' || target.id === 'diastolic') {
                recordBloodPressure();
            } else if (target.id === 'heart-rate') {
                recordHeartRate();
            } else if (target.id === 'sleep-hours') {
                recordSleep();
            }
        }
    });

    // Reset water intake daily
    const lastReset = localStorage.getItem('lastWaterReset');
    const today = new Date().toDateString();
    
    if (lastReset !== today) {
        healthTracker.resetWater();
        localStorage.setItem('lastWaterReset', today);
    }
});