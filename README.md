# HealthTracker 🏥

A comprehensive web-based health tracking application that helps you monitor and manage various aspects of your wellness journey.

## Features

### 📊 BMI Calculator
- Calculate Body Mass Index with height and weight
- Instant categorization (Underweight, Normal, Overweight, Obese)
- Health recommendations based on BMI category
- Input validation and error handling

### 💧 Water Intake Tracker
- Visual progress tracking with circular progress indicator
- Customizable daily water goals
- Quick add buttons (250ml, 500ml)
- Daily reset functionality
- Persistent storage across sessions

### 📈 Health Metrics Dashboard
- **Blood Pressure Monitoring**: Track systolic/diastolic readings with categorization
- **Heart Rate Tracking**: Monitor pulse with normal range indicators
- **Sleep Tracking**: Log sleep hours with quality assessment
- Historical data storage (last 50 records)
- Timestamped entries with health status indicators

### 💡 Daily Health Tips
- Rotating collection of wellness tips
- Evidence-based health advice
- Mental and physical health suggestions

## Technical Features

- **Responsive Design**: Mobile-first approach with cross-device compatibility
- **Local Storage**: Persistent data storage without requiring a backend
- **Accessibility**: Keyboard navigation support and focus management
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/erpranjalmishra/congenial-train.git
   cd congenial-train
   ```

2. **Open in browser**:
   Simply open `index.html` in your web browser. No build process or server required!

3. **Or serve locally** (optional):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## Usage

### BMI Calculator
1. Enter your height in centimeters
2. Enter your weight in kilograms
3. Click "Calculate BMI" or press Enter
4. View your BMI score, category, and health recommendations

### Water Tracking
1. Set your daily water goal (default: 2.5L)
2. Use the +250ml or +500ml buttons to log water intake
3. Monitor progress with the visual progress circle
4. Reset daily or as needed

### Health Metrics
1. **Blood Pressure**: Enter systolic and diastolic values, then click "Record"
2. **Heart Rate**: Enter your pulse in beats per minute
3. **Sleep**: Log hours of sleep (supports half-hour increments)
4. View your recent health history in the dashboard

## Data Privacy

- All data is stored locally in your browser
- No data is transmitted to external servers
- Clear your browser data to reset all stored information
- Data persists across browser sessions

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Health Disclaimer

⚠️ **Important**: This application is for informational purposes only and should not replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.

## Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons by [Font Awesome](https://fontawesome.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Health tips based on evidence from reputable health organizations

---

**Built with ❤️ for your wellness journey**