import Document, { Html, Head, Main, NextScript } from "next/document";

// _document for adding extra elements from outside our nextjs component
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
            <div id="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
