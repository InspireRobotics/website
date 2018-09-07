
# INSPIRE Robotics/Missing Parts Website

The Inspire Robotics Website

#### How to setup dev environment

1. [Install NodeJS](https://nodejs.org/en/)
2. Traverse to project directory and run `npm install`
3. Start development server with `node server`

After this, you can edit files and refresh to see instant updates.

#### Using a template

1. Create a template html file in the templates folder
2. Call the template from a file using triple braces (ex. {{{header.html}}}
3. The template will be added into the build by calling `node build` or if the development server is running