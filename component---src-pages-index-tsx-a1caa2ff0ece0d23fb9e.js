(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"9eSz":function(e,t,a){"use strict";var i=a("TqRt");t.__esModule=!0,t.default=void 0;var r,n=i(a("PJYZ")),s=i(a("VbXa")),l=i(a("8OQS")),o=i(a("pVnL")),d=i(a("q1tI")),c=i(a("17x9")),u=function(e){var t=(0,o.default)({},e),a=t.resolutions,i=t.sizes,r=t.critical;return a&&(t.fixed=a,delete t.resolutions),i&&(t.fluid=i,delete t.sizes),r&&(t.loading="eager"),t.fluid&&(t.fluid=E([].concat(t.fluid))),t.fixed&&(t.fixed=E([].concat(t.fixed))),t},f=function(e){var t=e.media;return!!t&&(y&&!!window.matchMedia(t).matches)},m=function(e){var t=e.fluid,a=e.fixed,i=h(t||a||[]);return i&&i.src},h=function(e){if(y&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(f);if(-1!==t)return e[t];var a=e.findIndex((function(e){return void 0===e.media}));if(-1!==a)return e[a]}return e[0]},g=Object.create({}),p=function(e){var t=u(e),a=m(t);return g[a]||!1},b="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,y="undefined"!=typeof window,v=y&&window.IntersectionObserver,S=new WeakMap;function w(e){return e.map((function(e){var t=e.src,a=e.srcSet,i=e.srcSetWebp,r=e.media,n=e.sizes;return d.default.createElement(d.default.Fragment,{key:t},i&&d.default.createElement("source",{type:"image/webp",media:r,srcSet:i,sizes:n}),a&&d.default.createElement("source",{media:r,srcSet:a,sizes:n}))}))}function E(e){var t=[],a=[];return e.forEach((function(e){return(e.media?t:a).push(e)})),[].concat(t,a)}function I(e){return e.map((function(e){var t=e.src,a=e.media,i=e.tracedSVG;return d.default.createElement("source",{key:t,media:a,srcSet:i})}))}function L(e){return e.map((function(e){var t=e.src,a=e.media,i=e.base64;return d.default.createElement("source",{key:t,media:a,srcSet:i})}))}function R(e,t){var a=e.srcSet,i=e.srcSetWebp,r=e.media,n=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(r?'media="'+r+'" ':"")+'srcset="'+(t?i:a)+'" '+(n?'sizes="'+n+'" ':"")+"/>"}var N=function(e,t){var a=(void 0===r&&"undefined"!=typeof window&&window.IntersectionObserver&&(r=new window.IntersectionObserver((function(e){e.forEach((function(e){if(S.has(e.target)){var t=S.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(r.unobserve(e.target),S.delete(e.target),t())}}))}),{rootMargin:"200px"})),r);return a&&(a.observe(e),S.set(e,t)),function(){a.unobserve(e),S.delete(e)}},z=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",i=e.srcSet?'srcset="'+e.srcSet+'" ':"",r=e.title?'title="'+e.title+'" ':"",n=e.alt?'alt="'+e.alt+'" ':'alt="" ',s=e.width?'width="'+e.width+'" ':"",l=e.height?'height="'+e.height+'" ':"",o=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",d=e.loading?'loading="'+e.loading+'" ':"",c=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?R(e,!0):"")+R(e)})).join("")+"<img "+d+s+l+a+i+t+n+r+o+c+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},O=d.default.forwardRef((function(e,t){var a=e.src,i=e.imageVariants,r=e.generateSources,n=e.spreadProps,s=e.ariaHidden,l=d.default.createElement(k,(0,o.default)({ref:t,src:a},n,{ariaHidden:s}));return i.length>1?d.default.createElement("picture",null,r(i),l):l})),k=d.default.forwardRef((function(e,t){var a=e.sizes,i=e.srcSet,r=e.src,n=e.style,s=e.onLoad,c=e.onError,u=e.loading,f=e.draggable,m=e.ariaHidden,h=(0,l.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"]);return d.default.createElement("img",(0,o.default)({"aria-hidden":m,sizes:a,srcSet:i,src:r},h,{onLoad:s,onError:c,ref:t,loading:u,draggable:f,style:(0,o.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},n)}))}));k.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var x=function(e){function t(t){var a;(a=e.call(this,t)||this).seenBefore=y&&p(t),a.isCritical="eager"===t.loading||t.critical,a.addNoScript=!(a.isCritical&&!t.fadeIn),a.useIOSupport=!b&&v&&!a.isCritical&&!a.seenBefore;var i=a.isCritical||y&&(b||!a.useIOSupport);return a.state={isVisible:i,imgLoaded:!1,imgCached:!1,fadeIn:!a.seenBefore&&t.fadeIn,isHydrated:!1},a.imageRef=d.default.createRef(),a.placeholderRef=t.placeholderRef||d.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,n.default)(a)),a.handleRef=a.handleRef.bind((0,n.default)(a)),a}(0,s.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.setState({isHydrated:y}),this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:p(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=N(e,(function(){var e=p(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){t.setState({imgLoaded:e,imgCached:!(!t.imageRef.current||!t.imageRef.current.currentSrc)})}))})))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=u(e),(a=m(t))&&(g[a]=!0),this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,i=e.className,r=e.style,n=void 0===r?{}:r,s=e.imgStyle,l=void 0===s?{}:s,c=e.placeholderStyle,f=void 0===c?{}:c,m=e.placeholderClassName,g=e.fluid,p=e.fixed,b=e.backgroundColor,y=e.durationFadeIn,v=e.Tag,S=e.itemProp,E=e.loading,R=e.draggable,N=g||p;if(!N)return null;var x=!1===this.state.fadeIn||this.state.imgLoaded,V=!0===this.state.fadeIn&&!this.state.imgCached,T=(0,o.default)({opacity:x?1:0,transition:V?"opacity "+y+"ms":"none"},l),H="boolean"==typeof b?"lightgray":b,C={transitionDelay:y+"ms"},j=(0,o.default)({opacity:this.state.imgLoaded?0:1},V&&C,l,f),P={title:t,alt:this.state.isVisible?"":a,style:j,className:m,itemProp:S},W=this.state.isHydrated?h(N):N[0];if(g)return d.default.createElement(v,{className:(i||"")+" gatsby-image-wrapper",style:(0,o.default)({position:"relative",overflow:"hidden",maxWidth:W.maxWidth?W.maxWidth+"px":null,maxHeight:W.maxHeight?W.maxHeight+"px":null},n),ref:this.handleRef,key:"fluid-"+JSON.stringify(W.srcSet)},d.default.createElement(v,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/W.aspectRatio+"%"}}),H&&d.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,o.default)({backgroundColor:H,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},V&&C)}),W.base64&&d.default.createElement(O,{ariaHidden:!0,ref:this.placeholderRef,src:W.base64,spreadProps:P,imageVariants:N,generateSources:L}),W.tracedSVG&&d.default.createElement(O,{ariaHidden:!0,ref:this.placeholderRef,src:W.tracedSVG,spreadProps:P,imageVariants:N,generateSources:I}),this.state.isVisible&&d.default.createElement("picture",null,w(N),d.default.createElement(k,{alt:a,title:t,sizes:W.sizes,src:W.src,crossOrigin:this.props.crossOrigin,srcSet:W.srcSet,style:T,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:S,loading:E,draggable:R})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:z((0,o.default)({alt:a,title:t,loading:E},W,{imageVariants:N}))}}));if(p){var q=(0,o.default)({position:"relative",overflow:"hidden",display:"inline-block",width:W.width,height:W.height},n);return"inherit"===n.display&&delete q.display,d.default.createElement(v,{className:(i||"")+" gatsby-image-wrapper",style:q,ref:this.handleRef,key:"fixed-"+JSON.stringify(W.srcSet)},H&&d.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,o.default)({backgroundColor:H,width:W.width,opacity:this.state.imgLoaded?0:1,height:W.height},V&&C)}),W.base64&&d.default.createElement(O,{ariaHidden:!0,ref:this.placeholderRef,src:W.base64,spreadProps:P,imageVariants:N,generateSources:L}),W.tracedSVG&&d.default.createElement(O,{ariaHidden:!0,ref:this.placeholderRef,src:W.tracedSVG,spreadProps:P,imageVariants:N,generateSources:I}),this.state.isVisible&&d.default.createElement("picture",null,w(N),d.default.createElement(k,{alt:a,title:t,width:W.width,height:W.height,sizes:W.sizes,src:W.src,crossOrigin:this.props.crossOrigin,srcSet:W.srcSet,style:T,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:S,loading:E,draggable:R})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:z((0,o.default)({alt:a,title:t,loading:E},W,{imageVariants:N}))}}))}return null},t}(d.default.Component);x.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var V=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string}),T=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string,maxWidth:c.default.number,maxHeight:c.default.number});function H(e){return function(t,a,i){var r;if(!t.fixed&&!t.fluid)throw new Error("The prop `fluid` or `fixed` is marked as required in `"+i+"`, but their values are both `undefined`.");c.default.checkPropTypes(((r={})[a]=e,r),t,"prop",i)}}x.propTypes={resolutions:V,sizes:T,fixed:H(c.default.oneOfType([V,c.default.arrayOf(V)])),fluid:H(c.default.oneOfType([T,c.default.arrayOf(T)])),fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string,loading:c.default.oneOf(["auto","lazy","eager"]),draggable:c.default.bool};var C=x;t.default=C},AIsN:function(e,t,a){},FBuT:function(e,t,a){},LZ9u:function(e,t,a){"use strict";var i=a("q1tI"),r=a.n(i),n=(a("AIsN"),a("Wbzz")),s=(a("FBuT"),function(){return r.a.createElement("header",null,r.a.createElement("div",{className:"logo-container"},"Nviable"),r.a.createElement("div",{className:"navigation-container"},r.a.createElement("ul",{className:"nav"},r.a.createElement("li",null,r.a.createElement(n.a,{to:"/"},"Home")),r.a.createElement("li",null,r.a.createElement(n.a,{to:"/research/"},"Research")))))}),l=[{title:"Facebook",url:"https://www.facebook.com/john.sohrawardi/",icon:"facebook"},{title:"Instagram",url:"https://instagram.com/nviable",icon:"instagram"},{title:"Twitter",url:"https://twitter.com/johnsohrawardi",icon:"twitter"},{title:"LinkedIn",url:"https://www.linkedin.com/in/sohrawardi/",icon:"linkedin-in"},{title:"Steam",url:"https://steamcommunity.com/id/nviable/",icon:"steam"},{title:"Twitch",url:"https://www.twitch.tv/nviable",icon:"twitch"}],o=(a("MSRa"),function(){var e=l.map((function(e,t){e.title;var a=e.url,i=e.icon;return r.a.createElement("li",{key:"social-link-"+t},r.a.createElement("a",{href:a,target:"_blank"},r.a.createElement("i",{className:"fab fa-"+i})))}));return r.a.createElement("footer",{id:"footer"},r.a.createElement("ul",{className:"social"},e))});t.a=function(e){var t=e.children,a=e.className,i=void 0===a?"":a;return r.a.createElement("main",null,r.a.createElement(s,null),r.a.createElement("div",{className:["page",i].join(" ")},t),r.a.createElement(o,null))}},MSRa:function(e,t,a){},QeBL:function(e,t,a){"use strict";a.r(t);var i=a("q1tI"),r=a.n(i),n=a("LZ9u"),s=(a("RFuN"),a("Wbzz")),l=a("9eSz"),o=a.n(l);t.default=function(){var e=Object(s.c)("1022108432");return console.log(e),r.a.createElement(n.a,{className:"page-home"},r.a.createElement("div",{className:"left"},r.a.createElement(o.a,{className:"profile-image",fluid:e.file.childImageSharp.fluid,alt:"A corgi smiling happily"})),r.a.createElement("div",{className:"right"},r.a.createElement("h2",null,"Hello everyone!"),r.a.createElement("p",null,"My name is Saniat Javid Sohrawardi (John)"),r.a.createElement("p",null,"I'm a PhD. student at B. Thomas Golisano College of Computing and Information Sciences working at the Global Cybersecurity Institute at Rochester Institute of Technology. My fields of research include, usable security & privacy, image forensics and phishing."),r.a.createElement("p",null,"I'm currently in process of building the website so it's visibly not in the best state.")))}},RFuN:function(e,t,a){}}]);
//# sourceMappingURL=component---src-pages-index-tsx-a1caa2ff0ece0d23fb9e.js.map