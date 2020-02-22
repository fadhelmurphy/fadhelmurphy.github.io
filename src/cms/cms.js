import CMS from "netlify-cms";
import { PathnameControl, PathnamePreview } from 'netlify-cms-widget-pathname';
 
CMS.registerWidget('pathname', PathnameControl, PathnamePreview);