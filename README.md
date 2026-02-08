# 💕 Valentine's Day Interactive Invitation

A romantic, interactive webpage designed as a Valentine's Day invitation for your long-term partner.

## 🎯 Features

- **4-step interactive journey** with personalized questions
- **Elegant visual design** with soft Valentine pink aesthetics
- **Smooth fade transitions** between steps
- **Playful interactions**:
  - "Think again" intermediate screen for "No" answers
  - Runaway button on final question that dodges hover
- **Fully responsive** design for all devices
- **Pure vanilla JavaScript** - no dependencies
- **GitHub Pages ready** - static site deployment

## 📁 Project Structure

```
valentine-invitation/
├── index.html          # Main HTML structure
├── style.css          # Styling and animations
├── script.js          # Interactive functionality
├── foto1.jpg          # Image for step 1
├── foto2.jpg          # Image for step 2
├── foto3.jpg          # Image for step 3
└── foto4.jpg          # Image for step 4
```

## 🚀 Deployment to GitHub Pages

### Step 1: Create Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `valentine-invitation`
3. Make it **public** (required for free GitHub Pages)
4. Don't initialize with README (we'll upload files directly)

### Step 2: Upload Files
1. Click "uploading an existing file"
2. Drag and drop ALL files:
   - `index.html`
   - `style.css`
   - `script.js`
   - `foto1.jpg` (your photo)
   - `foto2.jpg` (your photo)
   - `foto3.jpg` (your photo)
   - `foto4.jpg` (your photo)
3. Commit the files

### Step 3: Enable GitHub Pages
1. Go to repository **Settings**
2. Scroll to **Pages** section (left sidebar)
3. Under "Source", select **main** branch
4. Click **Save**
5. Wait 1-2 minutes for deployment

### Step 4: Access Your Site
Your site will be live at:
```
https://YOUR-USERNAME.github.io/valentine-invitation/
```

## 📸 Adding Your Photos

Replace the placeholder images with your own:

1. **foto1.jpg** - A photo from when you first met
2. **foto2.jpg** - A special moment together
3. **foto3.jpg** - A happy memory you share
4. **foto4.jpg** - A recent photo of you both

**Image recommendations:**
- Format: JPG or PNG
- Dimensions: 1200x800px or similar landscape ratio
- File size: < 2MB each for fast loading
- High quality but web-optimized

## 🎨 Customization

### Change Questions
Edit the `<h1 class="question">` elements in `index.html`:
```html
<h1 class="question">Your custom question here?</h1>
```

### Adjust Colors
Modify the gradients in `style.css`:
```css
body {
    background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 50%, #YOUR_COLOR3 100%);
}
```

### Change Button Text
Update button labels in `index.html`:
```html
<button class="btn btn-yes">Your text</button>
```

### Modify Final Message
Edit the final screen content in `index.html` at `id="final"`:
```html
<h1 class="question final-message">Your custom ending!</h1>
<p class="final-text">Your personal message here...</p>
```

## 🛠️ Technical Details

- **No frameworks required** - Pure HTML, CSS, and JavaScript
- **Fully accessible** - Keyboard navigation support
- **Mobile-optimized** - Responsive design for all screen sizes
- **Smooth animations** - CSS transitions with fallbacks
- **Cross-browser compatible** - Works on all modern browsers

## 💡 Tips

1. **Test locally first**: Open `index.html` in your browser before deploying
2. **Image placement**: Images must be in the same folder as `index.html`
3. **File names matter**: Keep exact names (`foto1.jpg`, `foto2.jpg`, etc.) or update references in HTML
4. **Mobile testing**: Check on phone before sharing the link
5. **Privacy**: Remember the repo is public, so photos will be visible to anyone with the link

## 🎭 How It Works

### User Flow:
1. **Step 1-3**: Questions with Yes/No buttons
   - "Yes" → Next step
   - "No" → "Think again" intermediate screen → Return to same step
2. **Step 4** (Final): Valentine invitation
   - "Yes" → Romantic confirmation message
   - "No" → Button runs away on hover (playful deterrent)
3. **Final Screen**: Beautiful message with animated hearts

### Technical Flow:
- Vanilla JavaScript manages state (`currentStep`)
- CSS handles visual layering (background → image → text)
- Fade transitions use CSS classes + JavaScript timing
- Runaway button uses random positioning on hover
- All images preloaded for smooth experience

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## ❤️ Made with Love

This project was created with care as a digital love letter. Every animation, color choice, and interaction was designed to create a memorable experience.

---

**Ready to deploy?** Just follow the steps above and share the link with your special someone! 💕
