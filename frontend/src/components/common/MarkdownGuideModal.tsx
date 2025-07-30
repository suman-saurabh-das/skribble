import ReactMarkdown from "react-markdown";
// icons
import { IoClose } from "react-icons/io5";
// types
import type { MarkdownGuideModalProps } from "../../utils/types";

const MarkdownGuideModal = ({
  setShowMarkdownGuideModal,
}: MarkdownGuideModalProps) => {
  return (
    <div className="absolute top-0 left-0 bg-black/80 h-screen w-full z-50">
      <div className="relative bg-lightHighlight dark:bg-darkBg prose dark:prose-invert m-8 p-8 rounded-lg max-w-none overflow-y-auto h-[calc(100vh-64px)]">
        <button
          className="fixed right-16 bg-lightHighlight dark:bg-darkBg border-2 border-darkSurface dark:border-lightSurface hover:border-red-600 hover:dark:border-red-600 cursor-pointer duration-150 p-1 rounded-md hover:text-red-600 transition-all"
          onClick={() => setShowMarkdownGuideModal(false)}
        >
          <IoClose className="text-2xl" />
        </button>
        <ReactMarkdown>
          {`
# Markdown guide

- [www.markdownguide.org](https://www.markdownguide.org/basic-syntax/)
- NOTE: Only the basic markdown syntax are supported!

## Heading
- To create a heading, add number signs (#) in front of a word or phrase.
- The number of number signs you use should correspond to the heading level.
- For example, to create a heading level three (&lt;h3&gt;), use three number signs (e.g., ### My Header).
- Headings can have levels 1 to 6, where 1 is the largest.

## Paragraphs
- To create paragraphs, use a blank line to separate one or more lines of text.

## Line Breaks
- To create a line break or new line, end a line with two or more spaces, and then type return.

## Emphasis
- You can add emphasis by making text bold or italic.

### Bold
- To bold text, add two asterisks or underscores before and after a word or phrase.
- To bold the middle of a word for emphasis, add two asterisks without spaces around the letters.

### Italic
- To italicize text, add one asterisk or underscore before and after a word or phrase.
- To italicize the middle of a word for emphasis, add one asterisk without spaces around the letters.

### Bold and Italic
- To emphasize text with bold and italics at the same time, add three asterisks or underscores before and after a word or phrase.
- To bold and italicize the middle of a word for emphasis, add three asterisks without spaces around the letters.

## Blockquotes
- To create a blockquote, add a &gt; in front of a paragraph.
- Blockquotes can contain multiple paragraphs. Add a &gt; on the blank lines between the paragraphs.

### Nested Blockquotes
- Blockquotes can be nested. Add a &gt;&gt; in front of the paragraph you want to nest.

## Lists
- You can organize items into ordered and unordered lists.

### Ordered Lists
- To create an ordered list, add line items with numbers followed by periods.
- The numbers don’t have to be in numerical order, but the list should start with the number one.

### Unordered Lists
- To create an unordered list, add dashes (-), asterisks (*), or plus signs (+) in front of line items.
- Indent one or more items to create a nested list.

### Adding Elements in Lists
- To add another element in a list while preserving the continuity of the list, indent the element four spaces or one tab.

## Code
- To denote a word or phrase as code, enclose it in backticks (&#96;).

### Escaping Backticks
- If the word or phrase you want to denote as code includes one or more backticks, you can escape it by enclosing the word or phrase in double backticks (&#96;&#96;).

## Fenced Code Blocks
- The basic Markdown syntax allows you to create code blocks by indenting lines by four spaces or one tab.
- If you find that inconvenient, try using fenced code blocks. Depending on your Markdown processor or editor, you’ll use three backticks (&#96;&#96;&#96;) or three tildes (~~~) on the lines before and after the code block.

~~~json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
~~~

## Horizontal Rules
- To create a horizontal rule, use three or more asterisks (***), dashes (---), or underscores (___) on a line by themselves.

## Links
- To create a link, enclose the link text in brackets (e.g., [Duck Duck Go]) and then follow it immediately with the URL in parentheses (e.g., (https://duckduckgo.com)).
- My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

### Adding Titles
- You can optionally add a title for a link. This will appear as a tooltip when the user hovers over the link. To add a title, enclose it in quotation marks after the URL.
- My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").

### URLs and Email Addresses
- To quickly turn a URL or email address into a link, enclose it in angle brackets. E.g. <https://www.markdownguide.org>

## Images
- To add an image, add an exclamation mark (!), followed by alt text in brackets, and the path or URL to the image asset in parentheses. 
- You can optionally add a title in quotation marks after the path or URL.
![The San Juan Mountains are beautiful!](https://mdg.imgix.net/assets/images/san-juan-mountains.jpg?auto=format&fit=clip&q=40&w=1080 "San Juan Mountains")

### Linking Images
- To add a link to an image, enclose the Markdown for the image in brackets, and then add the link in parentheses.
[![An old rock in the desert](https://mdg.imgix.net/assets/images/shiprock.jpg?auto=format&fit=clip&q=40&w=1080 "Shiprock, New Mexico by Beau Rogers")](https://www.flickr.com/photos/beaurogers/31833779864/in/photolist-Qv3rFw-34mt9F-a9Cmfy-5Ha3Zi-9msKdv-o3hgjr-hWpUte-4WMsJ1-KUQ8N-deshUb-vssBD-6CQci6-8AFCiD-zsJWT-nNfsgB-dPDwZJ-bn9JGn-5HtSXY-6CUhAL-a4UTXB-ugPum-KUPSo-fBLNm-6CUmpy-4WMsc9-8a7D3T-83KJev-6CQ2bK-nNusHJ-a78rQH-nw3NvT-7aq2qf-8wwBso-3nNceh-ugSKP-4mh4kh-bbeeqH-a7biME-q3PtTf-brFpgb-cg38zw-bXMZc-nJPELD-f58Lmo-bXMYG-bz8AAi-bxNtNT-bXMYi-bXMY6-bXMYv)

## Escaping Characters
- To display a literal character that would otherwise be used to format text in a Markdown document, add a backslash (&#92;) in front of the character.
- &#42; Without the backslash, this would be a bullet in an unordered list.

`}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownGuideModal;
