# Project 4: Around The U.S.

### Overview
- Link to project
- Figma
- Description of the project and its functionality
- Description of technologies and techniques used

## Figma

- [Link to the project in Figma](https://www.figma.com/file/avLHzpJw2dmU2NaDATZ6CX/Sprint-5%3A-Around-The-U.S.-%2F-desktop-%2B-mobile?node-id=0%3A1)

## Link
[Link to github pages](https://momofcats.github.io/web_project_4/index.html)

## Description of the project and its functionality
The project is a part of a Practicum curriculum that is teaching students advanced HTML, CSS and adaptive web design and basic javascript to manipulate DOM. Additionally, the project is teaching implementation of the BEM convention to a project.
The page is structured using semantic elements. The page is split Blocks, elements and modifiers are named according to BEM convention. Stylesheets are located in a blocks folder. All styles imported in a index.css file which is linked in the head of CSS style. The webpage layout is made to work for different screen resolutions. Strarting from 320px and going over 1280px.

## description of technologies and techniques used
The page layout is made utilizing CSS and HTML5. Positioning of blocks and elements rely on flexbox and grid. The layout for different screen sizes is adjusted using media querries. The eddit button on main paige opens up a hidden form. The input fields on the form can be updated by the user and the changes a shown on the main page. In case if the user forgot to submit form and used a close button istead the imput fields will have the data from the main page that was previously submitted with the form. The plus button allows the user to add photos to the image gallery vis cardForm. Each card is created using template and the photos are dynamically rendered on the page. Additionally, the information on the card is added to the array of existing cards. The user is also able to delete cards from the gallery by clicking on a garbage can icon. This action removes the card from the page as well as from the array of cards. Lastly, the user is able to like cards. The like button adds color to the heart icon.
