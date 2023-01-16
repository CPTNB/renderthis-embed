# renderthis-embed
Add embed links to your site using [renderthis](https://site.renderthis.app).

![embed demo](https://site.renderthis.app/embed-demo.gif)



## Usage (for react apps)
Install the package:
```sh
npm install --save renderthis-embed
```

Use the EmbedLink component in your code:
```jsx
import { EmbedLink } from 'renderthis-embed';
//...

   return <MyAwesomePage>
        <EmbedLink id="my-killer-component">
            <MyKillerComponent />
        </EmbedLink>
    <MyAwesomePage>
//...
```

## Demo
<demo link>

This repo contains a working example you can play around with by cloning and starting it:

```sh
git clone git@github.com:CPTNB/renderthis-embed.git
cd renderthis-embed
npm install
npm start
```
Navigate to [localhost:3000](http://localhost:3000).  NOTE: renderthis won't take screenshots of localhost -- see [caveats](#Caveats) below.

## API
| **Property**        | **Controls**                                                            | **Values**      | **Default**                            | **Required** |
|---------------------|-------------------------------------------------------------------------|-----------------|----------------------------------------|--------------|
| id                  | The CSS ID                                                              | a valid css id\*  |                                  | YES          |
| tooltip             | what the popup value is when a user clicks the screenshot icon          | a react element | "Screenshot link copied to clipboard." | NO           |
| position            | where the icon is shown                                                 | "left"\|"right" | "right"                                | NO           |
| icon                | the icon shown when mousing over the linked content                     | a svg element   | a little camera icon guy               | NO           |
| disableHighlighting | turns off the big dashed line and white flash around the linked content | true\|false     | false                                  | NO           |
| flags               | [renderthis screenshot flags](https://site.renderthis.app)        | a string        | "_"                                    | NO           |

\* The id supplied to the EmbedLink component should be stable across site render so that the renderthis servers capture what the user intended.
# Caveats
After clicking on the screenshot icon the link copied to the user's clipboard is a *[renderthis](https://site.renderthis.app)* link.  Renderthis is a service that will serve up screenshots of websites on demand.  This technique has some notable limitations:

1. Your website must be accessible by the renderthis server.  If your website is on a local dev box or inside a private network, renderthis won't be able to take a screenshot and uers' links will be dead.  You can get around this (*pending security considerations*) with a tunneling service like [ngrok](https://ngrok.com)

2. Renderthis is only taking a flat screenshot, so your dynamic content won't be dynamic wherever your user shares the link. When users click on the image, renderthis will re-direct them to your website.
