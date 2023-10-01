export default [
  {
    id: "e32af18d-7b0e-4a65-af76-4b0cf8e87131",
    name: "Hey there 👋",
    dateOfCreation: new Date("2023-09-28"),
    insideAFolder: false,
    content:
      '# Intro to keeper\n---\n\nHey there 👋, this is **keeper** a writing app built by [Sushant Mishra](https://twitter.com/sushantstwt)\n\nIt is aimed towards folks who code and like to have a minimal and distraction free interface to write there notes on.\n\n## Modes\n---\n\n**keeper** has 3 main modes : Editor, Previewer and Split\n\nYou can switch between these three modes, by using the icons on the top-right corner.\n\n1. **Editor** : It\'s gives you a markdown editor to edit you files.\n\n2. **Previewer** : It let\'s you see the preview of what you have written.\n\n3. **Split** : It let\'s you see both **Editor** and **Previewer** at the same time\n\n**We recommend using the Editor or the Previewer mode at the moment, since the split screen mode slows down as you type more text**\n\n## Features/Functions\n---\n\n### **Syntax  Highlight** \n\n```js\nconsole.log("Hello World!");\n```\n\n```python\nprint("Hello World")\n```\n\n```java\nclass HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello World!");\n    }\n}\n```\n\n### **Tables**\n\n| Name      | Company |\n| ----------- | ----------- |\n| Elon Musk      | Tesla       |\n| Mark Zuckerberg   | Meta        |\n| Tim Cook   | Apple        |\n\n### **Strike and Checkbox**\n\n~~Strikethrough~~\n\n* [ ] First Task\n* [x] Second Task\n',
  },
  {
    id: "0d7c57f2-8c36-4ef9-9c9a-1f5d28a521a3",
    name: "Python",
    state: "Open",
    noOfSubFolders: 4,
    isFolder: true,
    dateOfCreation: new Date("2023-10-28"),
    files: [
      {
        id: "8a9e3b84-64c1-4b7d-bf7d-3fcfe4c1d1e6",
        name: "Demo",
        dateOfCreation: new Date("2023-09-28"),
        folderId: "0d7c57f2-8c36-4ef9-9c9a-1f5d28a521a3",
        content:
          "# A demo of `react-markdown`\n\n`react-markdown` is a markdown component for React.\n\n👉 Changes are re-rendered as you type.\n\n👈 Try writing some markdown on the left.\n\n## Overview\n\n* Follows [CommonMark](https://commonmark.org)\n* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)\n* Renders actual React elements instead of using `dangerouslySetInnerHTML`\n* Lets you define your own components (to render `MyHeading` instead of `h1`)\n* Has a lot of plugins\n\n## Table of contents\n\nHere is an example of a plugin in action\n([`remark-toc`](https://github.com/remarkjs/remark-toc)).\nThis section is replaced by an actual table of contents.\n\n## Syntax highlighting\n\nHere is an example of a plugin to highlight code:\n[`rehype-highlight`](https://github.com/rehypejs/rehype-highlight).\n\n```js\nimport React from 'react'\nimport ReactDOM from 'react-dom'\nimport ReactMarkdown from 'react-markdown'\nimport rehypeHighlight from 'rehype-highlight'\n\nReactDOM.render(\n  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{'# Your markdown here'}</ReactMarkdown>,\n  document.querySelector('#content')\n)\n```\n\nPretty neat, eh?\n\n## GitHub flavored markdown (GFM)\n\nFor GFM, you can *also* use a plugin:\n[`remark-gfm`](https://github.com/remarkjs/react-markdown#use).\nIt adds support for GitHub-specific extensions to the language:\ntables, strikethrough, tasklists, and literal URLs.\n\nThese features **do not work by default**.\n👆 Use the toggle above to add the plugin.\n\n| Feature    | Support              |\n| ---------: | :------------------- |\n| CommonMark | 100%                 |\n| GFM        | 100% w/ `remark-gfm` |\n\n~~strikethrough~~\n\n* [ ] task list\n* [x] checked item\n\nhttps://example.com\n\n## HTML in markdown\n\n⚠️ HTML in markdown is quite unsafe, but if you want to support it, you can\nuse [`rehype-raw`](https://github.com/rehypejs/rehype-raw).\nYou should probably combine it with\n[`rehype-sanitize`](https://github.com/rehypejs/rehype-sanitize).\n\n<blockquote>\n  👆 Use the toggle above to add the plugin.\n</blockquote>\n\n## Components\n\nYou can pass components to change things:\n\n```js\nimport React from 'react'\nimport ReactDOM from 'react-dom'\nimport ReactMarkdown from 'react-markdown'\nimport MyFancyRule from './components/my-fancy-rule.js'\n\nReactDOM.render(\n  <ReactMarkdown\n    components={{\n      // Use h2s instead of h1s\n      h1: 'h2',\n      // Use a component instead of hrs\n      hr: ({node, ...props}) => <MyFancyRule {...props} />\n    }}\n  >\n    # Your markdown here\n  </ReactMarkdown>,\n  document.querySelector('#content')\n)\n```\n\n## More info?\n\nMuch more info is available in the\n[readme on GitHub](https://github.com/remarkjs/react-markdown)!\n\n***\n\nA component by [Espen Hovlandsdal](https://espen.codes/)",
      },
      {
        id: "f06ed71d-5fb6-4b98-bc74-5c3aeb65e91c",
        name: "Web Scarping",
        dateOfCreation: new Date("2023-09-28"),
        folderId: "0d7c57f2-8c36-4ef9-9c9a-1f5d28a521a3",
        content:
          "# Web Scraping in Python\n\nWeb scraping is the process of extracting data from websites. Python has a rich ecosystem of libraries and tools that make web scraping easy and efficient. In this document, we'll explore the basics of web scraping in Python.\n\n## Libraries for Web Scraping\n\nPython offers several libraries for web scraping, but two of the most popular ones are:\n\n- **Beautiful Soup**: A library that provides tools for web scraping HTML and XML documents. It makes it easy to navigate and manipulate the parse tree.\n\n- **Requests**: A library for making HTTP requests in Python. It is often used in conjunction with Beautiful Soup to retrieve web pages for scraping.\n\n## Installation\n\nYou can install these libraries using `pip`:\n\n\n## Basic Web Scraping Workflow\n\nHere's a simplified workflow for web scraping in Python:\n\n1. **Send an HTTP Request**: Use the `requests` library to send an HTTP GET request to the URL of the web page you want to scrape.\n\n   ```python\n   import requests\n\n   url = \"https://example.com\"\n   response = requests.get(url)```\n",
      },
      {
        id: "27d6b89e-84b9-41d8-8e0a-98e16d2b699d",
        name: "Generators",
        dateOfCreation: new Date("2023-09-28"),
        folderId: "0d7c57f2-8c36-4ef9-9c9a-1f5d28a521a3",
        content: "# Generators",
      },
      {
        id: "6a4c3be2-afe5-4c8e-aeb6-9a7495f4df2e",
        name: "Summary",
        dateOfCreation: new Date("2023-09-28"),
        folderId: "0d7c57f2-8c36-4ef9-9c9a-1f5d28a521a3",
        content: "# Summary",
      },
    ],
  },
];
