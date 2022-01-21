define(["exports","./Cartesian2-8417ca3d","./when-208fe5b0","./Check-d18af7c4","./EllipsoidGeodesic-8015072b","./EllipsoidRhumbLine-28521929","./IntersectionTests-7d224a2f","./Math-4e53b694","./Transforms-a73b3b3b","./Plane-4aa8974d"],function(a,m,p,e,r,d,v,w,P,T){"use strict";var y={numberOfPoints:function(a,e,r){e=m.Cartesian3.distance(a,e);return Math.ceil(e/r)},numberOfPointsRhumbLine:function(a,e,r){e=Math.pow(a.longitude-e.longitude,2)+Math.pow(a.latitude-e.latitude,2);return Math.max(1,Math.ceil(Math.sqrt(e/(r*r))))}},o=new m.Cartographic;y.extractHeights=function(a,e){for(var r=a.length,t=new Array(r),n=0;n<r;n++){var i=a[n];t[n]=e.cartesianToCartographic(i,o).height}return t};var b=new P.Matrix4,A=new m.Cartesian3,E=new m.Cartesian3,R=new T.Plane(m.Cartesian3.UNIT_X,0),M=new m.Cartesian3,S=new T.Plane(m.Cartesian3.UNIT_X,0),D=new m.Cartesian3,x=new m.Cartesian3,N=[];function G(a,e,r){var t=N;if(t.length=a,e===r){for(i=0;i<a;i++)t[i]=e;return t}for(var n=(r-e)/a,i=0;i<a;i++)t[i]=e+i*n;return t}var I=new m.Cartographic,k=new m.Cartographic,V=new m.Cartesian3,L=new m.Cartesian3,_=new m.Cartesian3,O=new r.EllipsoidGeodesic,B=new d.EllipsoidRhumbLine;y.wrapLongitude=function(a,e){var r=[],t=[];if(p.defined(a)&&0<a.length){e=p.defaultValue(e,P.Matrix4.IDENTITY);var n=P.Matrix4.inverseTransformation(e,b),e=P.Matrix4.multiplyByPoint(n,m.Cartesian3.ZERO,A),i=m.Cartesian3.normalize(P.Matrix4.multiplyByPointAsVector(n,m.Cartesian3.UNIT_Y,E),E),o=T.Plane.fromPointNormal(e,i,R),n=m.Cartesian3.normalize(P.Matrix4.multiplyByPointAsVector(n,m.Cartesian3.UNIT_X,M),M),s=T.Plane.fromPointNormal(e,n,S),c=1;r.push(m.Cartesian3.clone(a[0]));for(var l=r[0],u=a.length,h=1;h<u;++h){var f,g,C=a[h];(T.Plane.getPointDistance(s,l)<0||T.Plane.getPointDistance(s,C)<0)&&(f=v.IntersectionTests.lineSegmentPlane(l,C,o,D),p.defined(f)&&(g=m.Cartesian3.multiplyByScalar(i,5e-9,x),T.Plane.getPointDistance(o,l)<0&&m.Cartesian3.negate(g,g),r.push(m.Cartesian3.add(f,g,new m.Cartesian3)),t.push(c+1),m.Cartesian3.negate(g,g),r.push(m.Cartesian3.add(f,g,new m.Cartesian3)),c=1)),r.push(m.Cartesian3.clone(a[h])),c++,l=C}t.push(c)}return{positions:r,lengths:t}},y.generateArc=function(a){var e=(a=!p.defined(a)?{}:a).positions,r=e.length,t=p.defaultValue(a.ellipsoid,m.Ellipsoid.WGS84),n=p.defaultValue(a.height,0),i=Array.isArray(n);if(r<1)return[];if(1===r){var o,s=t.scaleToGeodeticSurface(e[0],L);return 0!==(n=i?n[0]:n)&&(o=t.geodeticSurfaceNormal(s,V),m.Cartesian3.multiplyByScalar(o,n,o),m.Cartesian3.add(s,o,s)),[s.x,s.y,s.z]}var c=a.minDistance;p.defined(c)||(g=p.defaultValue(a.granularity,w.CesiumMath.RADIANS_PER_DEGREE),c=w.CesiumMath.chordLength(g,t.maximumRadius));for(var l=0,u=0;u<r-1;u++)l+=y.numberOfPoints(e[u],e[u+1],c);var a=3*(l+1),h=new Array(a),f=0;for(u=0;u<r-1;u++)f=function(a,e,r,t,n,i,o,s){var c=t.scaleToGeodeticSurface(a,L),l=t.scaleToGeodeticSurface(e,_),u=y.numberOfPoints(a,e,r),c=t.cartesianToCartographic(c,I),l=t.cartesianToCartographic(l,k),h=G(u,n,i);O.setEndPoints(c,l);var f=O.surfaceDistance/u,g=s;c.height=n;var C=t.cartographicToCartesian(c,V);m.Cartesian3.pack(C,o,g),g+=3;for(var p=1;p<u;p++){var d=O.interpolateUsingSurfaceDistance(p*f,k);d.height=h[p],C=t.cartographicToCartesian(d,V),m.Cartesian3.pack(C,o,g),g+=3}return g}(e[u],e[u+1],c,t,i?n[u]:n,i?n[u+1]:n,h,f);N.length=0;var g=e[r-1],g=t.cartesianToCartographic(g,I);g.height=i?n[r-1]:n;g=t.cartographicToCartesian(g,V);return m.Cartesian3.pack(g,h,a-3),h};var U=new m.Cartographic,z=new m.Cartographic;y.generateRhumbArc=function(a){var e=(a=!p.defined(a)?{}:a).positions,r=e.length,t=p.defaultValue(a.ellipsoid,m.Ellipsoid.WGS84),n=p.defaultValue(a.height,0),i=Array.isArray(n);if(r<1)return[];if(1===r){var o,s=t.scaleToGeodeticSurface(e[0],L);return 0!==(n=i?n[0]:n)&&(o=t.geodeticSurfaceNormal(s,V),m.Cartesian3.multiplyByScalar(o,n,o),m.Cartesian3.add(s,o,s)),[s.x,s.y,s.z]}for(var c,l=p.defaultValue(a.granularity,w.CesiumMath.RADIANS_PER_DEGREE),u=0,h=t.cartesianToCartographic(e[0],U),f=0;f<r-1;f++)c=t.cartesianToCartographic(e[f+1],z),u+=y.numberOfPointsRhumbLine(h,c,l),h=m.Cartographic.clone(c,U);var s=3*(u+1),g=new Array(s),C=0;for(f=0;f<r-1;f++)C=function(a,e,r,t,n,i,o,s){var a=t.cartesianToCartographic(a,I),e=t.cartesianToCartographic(e,k),c=y.numberOfPointsRhumbLine(a,e,r);a.height=0,e.height=0;var l=G(c,n,i);(B=!B.ellipsoid.equals(t)?new d.EllipsoidRhumbLine(void 0,void 0,t):B).setEndPoints(a,e);var u=B.surfaceDistance/c,h=s;a.height=n;var f=t.cartographicToCartesian(a,V);m.Cartesian3.pack(f,o,h),h+=3;for(var g=1;g<c;g++){var C=B.interpolateUsingSurfaceDistance(g*u,k);C.height=l[g],f=t.cartographicToCartesian(C,V),m.Cartesian3.pack(f,o,h),h+=3}return h}(e[f],e[f+1],l,t,i?n[f]:n,i?n[f+1]:n,g,C);N.length=0;a=e[r-1],a=t.cartesianToCartographic(a,I);a.height=i?n[r-1]:n;a=t.cartographicToCartesian(a,V);return m.Cartesian3.pack(a,g,s-3),g},y.generateCartesianArc=function(a){for(var e=y.generateArc(a),r=e.length/3,t=new Array(r),n=0;n<r;n++)t[n]=m.Cartesian3.unpack(e,3*n);return t},y.generateCartesianRhumbArc=function(a){for(var e=y.generateRhumbArc(a),r=e.length/3,t=new Array(r),n=0;n<r;n++)t[n]=m.Cartesian3.unpack(e,3*n);return t},a.PolylinePipeline=y});
