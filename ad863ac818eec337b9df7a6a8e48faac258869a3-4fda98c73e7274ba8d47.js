(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"5Ves":function(e,a,t){"use strict";var l=t("k1TG"),n=t("8o2o"),r=t("q1tI"),s=t.n(r),o=t("TSYQ"),c=t.n(o),i=t("33Jr"),u=function(e){var a,t=e.className,r=e.cssModule,o=e.next,u=e.previous,d=e.first,f=e.last,m=e.tag,b=Object(n.a)(e,["className","cssModule","next","previous","first","last","tag"]),p=Object(i.b)(c()(t,"page-link"),r);u?a="Previous":o?a="Next":d?a="First":f&&(a="Last");var v,E=e["aria-label"]||a;u?v="‹":o?v="›":d?v="«":f&&(v="»");var x=e.children;return x&&Array.isArray(x)&&0===x.length&&(x=null),b.href||"a"!==m||(m="button"),(u||o||d||f)&&(x=[s.a.createElement("span",{"aria-hidden":"true",key:"caret"},x||v),s.a.createElement("span",{className:"sr-only",key:"sr"},E)]),s.a.createElement(m,Object(l.a)({},b,{className:p,"aria-label":E}),x)};u.defaultProps={tag:"a"},a.a=u},Bl7J:function(e,a,t){"use strict";var l=t("q1tI"),n=t.n(l),r=t("1Yj4"),s=t("Wbzz"),o=t("jYam"),c=(t("TJpk"),function(e){var a=e.siteTitle,t=e.postInfo;if(t){var l=t.postTitle,r=t.postDate;a=l}return n.a.createElement(n.a.Fragment,null,n.a.createElement("header",{className:"masthead"},n.a.createElement("div",{class:"container"},n.a.createElement("div",{class:"row justify-content-center px-5 pt-5"},n.a.createElement("div",{class:"mr-auto align-self-lg-center"},n.a.createElement("div",{class:"site-heading my-5 py-5"},n.a.createElement("h1",{style:{position:"absolute",left:"0%",top:"15%",fontSize:"20vw",WebkitTextFillColor:"white",WebkitTextStroke:"2px #d7eee1b3"}},a),n.a.createElement("h1",null,n.a.createElement("div",{className:"line-wrap h-75"},n.a.createElement("div",{className:"line-wrap-inner","data-aos":"fade-up","data-aos-duration":"600","data-aos-once":"true"},a))),r?n.a.createElement("div",{class:"subheading"},n.a.createElement("h3",{"data-aos":"zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"},n.a.createElement("div",{class:"reveal-holder","data-aos":"reveal-item"},n.a.createElement("div",{class:"reveal-block left","data-aos":"reveal-left"}),r))):n.a.createElement(n.a.Fragment,null,n.a.createElement("p",{"data-aos":"fade-up","data-aos-duration":"700","data-aos-once":"true",className:"mt-0"},"Hello, I'm Fadhel. App developer from Jakarta."),n.a.createElement("div",{class:"subheading"},n.a.createElement("h3",{"data-aos":"zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"800"},n.a.createElement("div",{class:"reveal-holder","data-aos":"reveal-item"},n.a.createElement("div",{class:"reveal-block left","data-aos":"reveal-left"}),"An")),n.a.createElement("h3",{"data-aos":"zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"1000"},n.a.createElement("div",{class:"reveal-holder","data-aos":"reveal-item"},n.a.createElement("div",{class:"reveal-block left","data-aos":"reveal-left"}),"Ordinary")),n.a.createElement("h3",{"data-aos":"zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"1200"},n.a.createElement("div",{class:"reveal-holder","data-aos":"reveal-item"},n.a.createElement("div",{class:"reveal-block left","data-aos":"reveal-left"}),"Developer"))))))))))});a.a=function(e){var a=e.children,t=e.postInfo,l=e.location;if(console.log(l),t)var i=t.postTitle,u=t.postDate;var d=Object(s.useStaticQuery)("3649515864");return n.a.createElement(n.a.Fragment,null,n.a.createElement(o.a,{position:"fixed-top",location:l}),i&&u?n.a.createElement(c,{postInfo:{postTitle:i,postDate:u}}):n.a.createElement(c,{siteTitle:d.site.siteMetadata.title}),n.a.createElement("main",{className:"container"},a),n.a.createElement(r.a,null,n.a.createElement("footer",{className:"d-block w-100"},"© ",(new Date).getFullYear(),", Built with"," ",n.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby"))))}},He4Z:function(e,a,t){"use strict";var l=t("q1tI"),n=t.n(l),r=t("Wbzz"),s=t("ok1R"),o=t("rhny"),c=function(e){var a=e.arrCount,t=e.index,n=e.children;return 1===a?l.createElement(l.Fragment,null,n):t+2<a?l.createElement(l.Fragment,null,n,", "):t+1===a?l.createElement(l.Fragment,null," ","&"," ",n):l.createElement(l.Fragment,null,n)},i=t("M4XY");a.a=function(e){var a=e.data,t=a.title,l=a.path,u=a.date,d=a.tags,f=(a.excerpt,a.id);return n.a.createElement("div",{className:"blog-post-preview",key:f},n.a.createElement("h1",{"data-aos":"fade-up"},n.a.createElement(s.a,null,n.a.createElement(o.a,{xs:"1",className:"d-none d-md-block date p-4 pr-lg-0 mw-100",style:{textAlign:"right"}},u.split(" ").map((function(e,a){return 2!==a?n.a.createElement("h6",null,e):n.a.createElement(n.a.Fragment,null)}))),n.a.createElement(o.a,{xs:"1",className:"d-none d-md-block date mw-100",style:{WebkitTextFillColor:"white",WebkitTextStroke:"1px #58a94161"}},u.split(" ")[2]),n.a.createElement(o.a,{xs:"8"},n.a.createElement(r.Link,{to:l},t),n.a.createElement("h6",{className:"mt-3"},n.a.createElement(s.a,null,n.a.createElement(o.a,{xs:"auto"},n.a.createElement("div",{className:"blog-post-category",style:{color:"#58a941"}},d?d.map((function(e,a,t){return n.a.createElement(c,{arrCount:t.length,index:a,key:e},n.a.createElement(r.Link,{to:"/tags/"+i(e),style:{color:"#58a941"}},e))})):null))))))))}},M4XY:function(e,a,t){(function(a){var t=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,l=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,n="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",r="["+n+"]",s="[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]",o="\\d+",c="[\\u2700-\\u27bf]",i="[a-z\\xdf-\\xf6\\xf8-\\xff]",u="[^\\ud800-\\udfff"+n+o+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",d="(?:\\ud83c[\\udde6-\\uddff]){2}",f="[\\ud800-\\udbff][\\udc00-\\udfff]",m="[A-Z\\xc0-\\xd6\\xd8-\\xde]",b="(?:"+i+"|"+u+")",p="(?:"+m+"|"+u+")",v="(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?",E="[\\ufe0e\\ufe0f]?"+v+("(?:\\u200d(?:"+["[^\\ud800-\\udfff]",d,f].join("|")+")[\\ufe0e\\ufe0f]?"+v+")*"),x="(?:"+[c,d,f].join("|")+")"+E,g=RegExp("['’]","g"),h=RegExp(s,"g"),y=RegExp([m+"?"+i+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[r,m,"$"].join("|")+")",p+"+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[r,m+b,"$"].join("|")+")",m+"?"+b+"+(?:['’](?:d|ll|m|re|s|t|ve))?",m+"+(?:['’](?:D|LL|M|RE|S|T|VE))?",o,x].join("|"),"g"),k=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,j="object"==typeof a&&a&&a.Object===Object&&a,N="object"==typeof self&&self&&self.Object===Object&&self,O=j||N||Function("return this")();var T,w=(T={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"ss"},function(e){return null==T?void 0:T[e]});var A=Object.prototype.toString,z=O.Symbol,I=z?z.prototype:void 0,S=I?I.toString:void 0;function F(e){if("string"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==A.call(e)}(e))return S?S.call(e):"";var a=e+"";return"0"==a&&1/e==-1/0?"-0":a}function L(e){return null==e?"":F(e)}var C,M=(C=function(e,a,t){return e+(t?"-":"")+a.toLowerCase()},function(e){return function(e,a,t,l){var n=-1,r=e?e.length:0;for(l&&r&&(t=e[++n]);++n<r;)t=a(t,e[n],n,e);return t}(function(e,a,l){return e=L(e),void 0===(a=l?void 0:a)?function(e){return k.test(e)}(e)?function(e){return e.match(y)||[]}(e):function(e){return e.match(t)||[]}(e):e.match(a)||[]}(function(e){return(e=L(e))&&e.replace(l,w).replace(h,"")}(e).replace(g,"")),C,"")});e.exports=M}).call(this,t("yLpj"))},TKOK:function(e,a,t){"use strict";var l=t("k1TG"),n=t("8o2o"),r=t("q1tI"),s=t.n(r),o=t("TSYQ"),c=t.n(o),i=t("33Jr"),u=function(e){var a=e.active,t=e.className,r=e.cssModule,o=e.disabled,u=e.tag,d=Object(n.a)(e,["active","className","cssModule","disabled","tag"]),f=Object(i.b)(c()(t,"page-item",{active:a,disabled:o}),r);return s.a.createElement(u,Object(l.a)({},d,{className:f}))};u.defaultProps={tag:"li"},a.a=u},bAGh:function(e,a,t){"use strict";var l=t("k1TG"),n=t("8o2o"),r=t("q1tI"),s=t.n(r),o=t("TSYQ"),c=t.n(o),i=t("33Jr"),u=function(e){var a,t=e.className,r=e.listClassName,o=e.cssModule,u=e.size,d=e.tag,f=e.listTag,m=e["aria-label"],b=Object(n.a)(e,["className","listClassName","cssModule","size","tag","listTag","aria-label"]),p=Object(i.b)(c()(t),o),v=Object(i.b)(c()(r,"pagination",((a={})["pagination-"+u]=!!u,a)),o);return s.a.createElement(d,{className:p,"aria-label":m},s.a.createElement(f,Object(l.a)({},b,{className:v})))};u.defaultProps={tag:"nav",listTag:"ul","aria-label":"pagination"},a.a=u}}]);
//# sourceMappingURL=ad863ac818eec337b9df7a6a8e48faac258869a3-4fda98c73e7274ba8d47.js.map