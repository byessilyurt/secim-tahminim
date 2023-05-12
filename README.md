[See Demo](https://secim-tarihim.firebaseapp.com)
This project is an interactive prediction tool for the 2023 Turkey Elections. The application allows users to visualize their election predictions, by choosing the winning party for each city, and specifying the vote percentage for each presidential candidate.

The main features of the application are:

- The ability to paint each city in Turkey with a color representing the predicted winning party.
- A summary of the predicted vote percentage for each presidential candidate.
- A share feature that generates an image of the user's prediction, which can then be shared on social media platforms like Twitter.

The project is built using React, along with libraries such as React SVG for rendering SVG maps, HTML to Image for generating shareable images, and Tailwind CSS for styling.

## Noteworthy Implementation Details:

1.  **Interactive SVG Map:** The app uses an SVG map of Turkey where each city is a clickable path. On clicking or touch-move over a city, the city is painted with the currently selected party's color.
2.  **Presidential Vote Percentage:** The app allows users to set the vote percentage for each presidential candidate. The percentages are adjustable such that they always sum up to 100%. This feature required careful state management to ensure that the user's inputs remain within the valid range.
3.  **Image Generation for Sharing:** One of the notable features is the ability to generate a shareable image of the user's prediction. The image generation uses the html-to-image library, and some interesting challenges were tackled to ensure proper rendering of images and handling of cross-browser compatibility issues.
4.  **Social Media Sharing:** The application integrates with social media platforms like Twitter, allowing users to directly share their predictions. Users are reminded to attach the downloaded image when sharing their prediction.
5.  **Responsive Design:** The application is designed with mobile-first approach and is responsive across different screen sizes.
