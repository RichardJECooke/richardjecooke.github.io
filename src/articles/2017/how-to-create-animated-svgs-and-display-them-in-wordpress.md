---
layout: layout_post.html
title: How to create animated SVGs (and display them in WordPress)
tags: ['post', 'animation', 'svg', 'coding', 'design', 'art']
date: 2017-01-29 12:16:39
---

Animated SVGs are great for animated logos, custom spinners, and other artwork that makes your site look sophisticated, beautiful, and full of character.

They are also tiny in file size, and can resize to any screen size without degrading - unlike videos and .gifs.

## Example

```xml
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.4.1/snap.svg-min.js"></script>
  </head>
  <body>
    <svg
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      width="400"
      height="400"
      viewBox="0 0 105.83333 105.83333"
      version="1.1"
      id="svg8"
      inkscape:version="0.92.0 r15299"
      sodipodi:docname="house.svg">
      <defs
        id="defs2">
        <filter
          style="color-interpolation-filters:sRGB;"
          inkscape:label="Blur"
          id="filter4598">
          <feGaussianBlur
            stdDeviation="0.5 0.4"
            result="blur"
            id="feGaussianBlur4596" />
        </filter>
        <filter
          style="color-interpolation-filters:sRGB;"
          inkscape:label="Blur"
          id="filter4634">
          <feGaussianBlur
            stdDeviation="0.5 0.5"
            result="blur"
            id="feGaussianBlur4632" />
        </filter>
        <filter
          style="color-interpolation-filters:sRGB"
          inkscape:label="Blur"
          id="filter4634-3">
          <feGaussianBlur
            stdDeviation="0.5 0.5"
            result="blur"
            id="feGaussianBlur4632-1" />
        </filter>
      </defs>
      <sodipodi:namedview
        id="base"
        pagecolor="#ffffff"
        bordercolor="#666666"
        borderopacity="1.0"
        inkscape:pageopacity="0.0"
        inkscape:pageshadow="2"
        inkscape:zoom="2"
        inkscape:cx="248.69088"
        inkscape:cy="193.43717"
        inkscape:document-units="mm"
        inkscape:current-layer="layer3"
        showgrid="false"
        units="px"
        inkscape:showpageshadow="false"
        inkscape:window-width="1920"
        inkscape:window-height="1057"
        inkscape:window-x="1912"
        inkscape:window-y="-8"
        inkscape:window-maximized="1">
        <inkscape:grid
          type="xygrid"
          id="grid4510" />
      </sodipodi:namedview>
      <metadata
        id="metadata5">
        <rdf:RDF>
          <cc:Work
            rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type
              rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
          </cc:Work>
        </rdf:RDF>
      </metadata>
      <g
        inkscape:groupmode="layer"
        id="layer2"
        inkscape:label="bg"
        sodipodi:insensitive="true">
        <rect
          style="fill:#348aff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.22344589;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
          id="rect4485"
          width="105.83334"
          height="105.83334"
          x="3.5527137e-015"
          y="-1.0172526e-005" />
      </g>
      <g
        inkscape:label="roof"
        inkscape:groupmode="layer"
        id="layer1"
        transform="translate(0,-191.16667)"
        sodipodi:insensitive="true">
        <path
          style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.79374999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
          d="m 17.991667,270.54167 35.454165,-35.71875 7e-6,6.61458 -28.839584,29.10417 z"
          id="rect4487"
          inkscape:connector-curvature="0"
          sodipodi:nodetypes="ccccc" />
        <path
          style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.79374999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
          d="m 88.829853,270.54167 -35.454164,-35.71875 -8e-6,6.61458 28.839583,29.10417 z"
          id="rect4487-6"
          inkscape:connector-curvature="0"
          sodipodi:nodetypes="ccccc" />
        <rect
          style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.64275998;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
          id="rect4527"
          width="5.291667"
          height="11.641666"
          x="71.834381"
          y="247.25833" />
        <rect
          style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.62937742;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
          id="rect4534"
          width="2.6759853"
          height="7.8109517"
          x="70.14061"
          y="247.25833" />
      </g>
      <g
        inkscape:groupmode="layer"
        id="gsmoke"
        inkscape:label="smoke">
        <circle
          style="fill:#ffffff;fill-opacity:0.46261686;fill-rule:nonzero;stroke:none;stroke-width:0.79374999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;filter:url(#filter4598)"
          id="smoke"
          cx="73.626945"
          cy="59.90966"
          r="2.8442707" />
      </g>
    </svg>
    <script>
      var s = Snap("#smoke");
      var go = function animate(){
        s.attr({cy: 60, r: 2});
        s.animate({cy: -10, r: 12}, 3000);
        setTimeout(go, 3000);
      }
      go();
    </script>
  </body>
</html>
```

## Options (not really)
There are three ways to animate an svg, but only the last has a future:

1.  SMIL - the internal SVG animation language
1.  Internal Javascript (JS)
1.  External CSS or JS


### SMIL
Was never supported by Internet Explorer / Edge and will be deprecated by Chrome because it never became popular.  Which is a pity, because it's the most elegant solution - animation elements can be kept neatly inside the svg itself, which means it's modular and reusable. There's a [polyfill](https://github.com/ericwilligers/svg-animation), but it hasn't been touched in a year and the author is missing. It seems SMIL is dead.

### Internal JS
Is modular and reusable, but is incompatible with frameworks like Wordpress, and not that secure as you're allowing external JS on your site.

### External CSS/JS
This is the only real option. You animate your svg with CSS animations or [Snap](http://snapsvg.io/). It means you have to coordinate both the SVG code and the CSS code and JS code on your page.

## Tools
The paid way (I haven't tried it): [https://blogs.adobe.com/creativecloud/export-svg-animations-for-the-web-with-snap-svg/](https://blogs.adobe.com/creativecloud/export-svg-animations-for-the-web-with-snap-svg/).

The free way: Either draw your SVG first in [Inkscape](https://inkscape.org/en/download/) and then animate it in Snap, or just do everything in Snap from the beginning: [https://github.com/ericwilligers/svg-animation.](http://snapsvg.io/start/)

Writing this tutorial I found Snap hard to use - the documentation is just one long API with no example.  I'd rather try svg.js or something else in future: [http://noeticforce.com/Javascript-libraries-for-svg-animation](http://noeticforce.com/Javascript-libraries-for-svg-animation).

## Add SVGs to WordPress

To upload svgs to WordPress use the [SVG Support](https://wordpress.org/plugins/svg-support/) plugin.

You still have to add the custom JS though for it to animate.  I find it easier just dump the whole lot of raw code into my page for now using: https://wordpress.org/plugins/raw-html/

## Code
The image above is generated with this code:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.4.1/snap.svg-min.js"></script>
  </head>
  <body>
    <svg
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      width="400"
      height="400"
      viewBox="0 0 105.83333 105.83333"
      version="1.1"
      id="svg8"
      inkscape:version="0.92.0 r15299"
      sodipodi:docname="house.svg">
      <defs
        id="defs2">
        <filter
          style="color-interpolation-filters:sRGB;"
          inkscape:label="Blur"
          id="filter4598">
          <feGaussianBlur
            stdDeviation="0.5 0.4"
            result="blur"
            id="feGaussianBlur4596" />
        </filter>
        <filter
          style="color-interpolation-filters:sRGB;"
          inkscape:label="Blur"
          id="filter4634">
          <feGaussianBlur
            stdDeviation="0.5 0.5"
            result="blur"
            id="feGaussianBlur4632" />
        </filter>
        <filter
          style="color-interpolation-filters:sRGB"
          inkscape:label="Blur"
          id="filter4634-3">
          <feGaussianBlur
            stdDeviation="0.5 0.5"
            result="blur"
            id="feGaussianBlur4632-1" />
        </filter>
      </defs>
      <sodipodi:namedview
        id="base"
        pagecolor="#ffffff"
        bordercolor="#666666"
        borderopacity="1.0"
        inkscape:pageopacity="0.0"
        inkscape:pageshadow="2"
        inkscape:zoom="2"
        inkscape:cx="248.69088"
        inkscape:cy="193.43717"
        inkscape:document-units="mm"
        inkscape:current-layer="layer3"
        showgrid="false"
        units="px"
        inkscape:showpageshadow="false"
        inkscape:window-width="1920"
        inkscape:window-height="1057"
        inkscape:window-x="1912"
        inkscape:window-y="-8"
        inkscape:window-maximized="1">
        <inkscape:grid
          type="xygrid"
          id="grid4510" />
      </sodipodi:namedview>
      <metadata
        id="metadata5">
        <rdf:RDF>
          <cc:Work
            rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type
              rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
          </cc:Work>
        </rdf:RDF>
      </metadata>
      <g
        inkscape:groupmode="layer"
        id="layer2"
        inkscape:label="bg"
        sodipodi:insensitive="true">
        <rect
          style="fill:#348aff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.22344589;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
          id="rect4485"
          width="105.83334"
          height="105.83334"
          x="3.5527137e-015"
          y="-1.0172526e-005" />
      </g>
      <g
        inkscape:label="roof"
        inkscape:groupmode="layer"
        id="layer1"
        transform="translate(0,-191.16667)"
        sodipodi:insensitive="true">
        <path
          style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.79374999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
          d="m 17.991667,270.54167 35.454165,-35.71875 7e-6,6.61458 -28.839584,29.10417 z"
          id="rect4487"
          inkscape:connector-curvature="0"
          sodipodi:nodetypes="ccccc" />
        <path
          style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.79374999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
          d="m 88.829853,270.54167 -35.454164,-35.71875 -8e-6,6.61458 28.839583,29.10417 z"
          id="rect4487-6"
          inkscape:connector-curvature="0"
          sodipodi:nodetypes="ccccc" />
        <rect
          style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.64275998;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
          id="rect4527"
          width="5.291667"
          height="11.641666"
          x="71.834381"
          y="247.25833" />
        <rect
          style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.62937742;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
          id="rect4534"
          width="2.6759853"
          height="7.8109517"
          x="70.14061"
          y="247.25833" />
      </g>
      <g
        inkscape:groupmode="layer"
        id="gsmoke"
        inkscape:label="smoke">
        <circle
          style="fill:#ffffff;fill-opacity:0.46261686;fill-rule:nonzero;stroke:none;stroke-width:0.79374999;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;filter:url(#filter4598)"
          id="smoke"
          cx="73.626945"
          cy="59.90966"
          r="2.8442707" />
      </g>
    </svg>
    <script>
      var s = Snap("#smoke");
      var go = function animate(){
        s.attr({cy: 60, r: 2});
        s.animate({cy: -10, r: 12}, 3000);
        setTimeout(go, 3000);
      }
      go();
    </script>
  </body>
</html>
```
