# Google Sheet Setup for Dynamic Projects

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Portfolio Projects" or similar
4. Create a sheet tab named **"Projects"** (case-sensitive)

## Step 2: Set Up Your Sheet Columns

Add the following column headers in **Row 1**:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| title | description | liveUrl | githubUrl | imageUrl | tags |

### Example Data (Row 2):

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| AI Chat App | A full-stack AI chatbot built with React and OpenAI API | https://mychatapp.com | https://github.com/ChitkulLakshya/ai-chat | https://i.imgur.com/example.jpg | React, TypeScript, OpenAI |

### Column Details:

- **title**: Project name
- **description**: Brief description (40-60 words recommended)
- **liveUrl**: Live project URL (or "#" if not deployed)
- **githubUrl**: GitHub repository URL
- **imageUrl**: Direct image URL (use Imgur, Cloudinary, or Google Drive public link)
- **tags**: Comma-separated tech stack (e.g., "React, Node.js, MongoDB")

## Step 3: Make Sheet Public

1. Click **Share** button (top right)
2. Click **Change to anyone with the link**
3. Set permission to **Viewer**
4. Click **Done**

## Step 4: Get Your Sheet ID

Your Sheet ID is in the URL:
```
https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
```

Example:
```
https://docs.google.com/spreadsheets/d/1abc123XYZ456/edit
                                      ↑ This is your SHEET_ID
```

## Step 5: Get Google Sheets API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing one)
3. Enable **Google Sheets API**:
   - Click "Enable APIs and Services"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create API credentials:
   - Go to **Credentials** → **Create Credentials** → **API Key**
   - Copy your API key
5. (Optional) Restrict the API key:
   - Click on the created key
   - Under "API restrictions", select "Restrict key"
   - Select only "Google Sheets API"
   - Under "Website restrictions", add your domain

## Step 6: Update Your Code

Open `src/pages/Projects.tsx` and update these lines:

```typescript
const SHEET_ID = "YOUR_SHEET_ID_HERE"; // Replace with your Sheet ID
const API_KEY = "YOUR_API_KEY_HERE";   // Replace with your API Key
```

## Step 7: Test It Out

1. Save your changes
2. Your website will automatically fetch projects from the sheet
3. Try adding a new project to the sheet - it will appear within 1 minute!

## Tips for Images

### Option 1: Imgur (Easiest)
1. Upload to [Imgur](https://imgur.com)
2. Right-click image → "Copy image address"
3. Use that URL in the imageUrl column

### Option 2: Google Drive
1. Upload to Google Drive
2. Right-click → Get link → Set to "Anyone with the link"
3. Get the file ID from the URL
4. Use: `https://drive.google.com/uc?export=view&id=FILE_ID`

### Option 3: Cloudinary
1. Upload to [Cloudinary](https://cloudinary.com) (free account)
2. Copy the public URL

## Troubleshooting

### Projects Not Showing?
- Check browser console for errors
- Verify SHEET_ID and API_KEY are correct
- Ensure sheet name is exactly "Projects" (case-sensitive)
- Confirm sheet is public (Viewer access)

### API Key Not Working?
- Make sure Google Sheets API is enabled in Google Cloud Console
- Try creating a new API key
- Check API key restrictions aren't too strict

### Images Not Loading?
- Use direct image URLs (must end in .jpg, .png, etc.)
- For Google Drive, use the `uc?export=view&id=` format
- Test image URL in a new browser tab

## Auto-Update Feature

Your website automatically refetches project data every 60 seconds, so new projects appear without redeploying!

To change the refresh interval, edit this line in `Projects.tsx`:
```typescript
refetchInterval: 60000, // milliseconds (60000 = 1 minute)
```

## Example Sheet

Here's a template you can copy:
[Google Sheet Template](https://docs.google.com/spreadsheets/d/1example/copy)

---

Need help? Check the console in your browser's Developer Tools (F12) for error messages.
