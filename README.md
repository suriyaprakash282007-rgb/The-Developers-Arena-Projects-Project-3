# Interactive Portfolio Website

A premium, interactive portfolio website for a **Creative Technologist & UI/UX Engineer**. The design utilizes glassmorphism, fluid responsive layouts, customizable dark/light modes, custom typography, and dynamic interactive components built entirely with vanilla HTML5, CSS3, and JavaScript.

---

## 🚀 Key Features

1. **Light & Dark Theme Toggle**:
   - Swaps color palettes seamlessly with transition animations.
   - Automatically detects standard user system color schemes (e.g. system dark preference).
   - Persists user preferences locally across reloads using `localStorage`.

2. **Show/Hide Dynamic Biography Tabs**:
   - A modern tabbed navigation component under the "About Me" section.
   - Smoothly shows and hides detailed blocks of content (Skills, Experience, Education) with CSS transitions.

3. **Interactive Project Image Slider (Carousel)**:
   - Displays project UI mockups (Nova AI Analytics, Helios Smart Home, Vortex Space Travel).
   - Provides previous/next slider arrows and interactive bottom dot indicators.
   - Includes automatic loop timing (autoplay) which pauses or resets on user interaction.

4. **Collaboration Planner Widget (To-Do List)**:
   - A fully functional list builder where prospective clients can draft collaboration milestones.
   - Features milestone tasks list, add forms, complete checkboxes, and deletion options.
   - Syncs lists automatically to `localStorage` so items remain after reload.

5. **Contact Form with Real-Time Validation**:
   - Form field inputs (Name, Email, Subject, Message) verified on `blur` and `input` events.
   - Renders animated, user-friendly inline error alerts if requirements (valid email structure, length constraints) are missing.
   - Displays a success state slide-over card upon valid submission, allowing the user to reset and send another message.

6. **Scroll Progress Indicator**:
   - A smooth horizontal loading bar anchored to the top of the browser that tracks user reading progress dynamically.

---

## 📂 Project Structure

```
interactive-portfolio/
│
├── images/                  # High-quality mockups and avatars
│   ├── profile.png          # Avatar profile image
│   ├── project1.png         # Project 1 mockup (AI Analytics Dashboard)
│   ├── project2.png         # Project 2 mockup (Smart Home App)
│   └── project3.png         # Project 3 mockup (Space Travel Booking)
│
├── index.html               # Main markup skeleton with Google Fonts and CDNs
├── style.css                # Style sheets containing themes, grid/flex structures, transitions
├── script.js                # Core JS logic controlling toggles, widgets, and validations
└── README.md                # Project documentation
```

---

## 🛠️ Technology Stack Used

- **Markup**: HTML5 Semantic Structure
- **Styles**: Custom CSS3 Variables, CSS Grid, Flexbox, Glassmorphism, CSS Transitions
- **Logic**: Modern Vanilla JavaScript (ES6+), DOM Manipulation, Event Listeners
- **Icons**: Lucide Icons CDN Integration
- **Typography**: Google Fonts (Outfit & Plus Jakarta Sans)

---

## 💻 Local Setup Instructions

1. Clone or download this project folder onto your local disk.
2. Open `index.html` directly in any web browser, or use a local development server like VS Code Live Server or python's `http.server`:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to `http://localhost:8000`.
