/**
 * potree.js
 * http://potree.org
 *
 * Copyright 2012, Markus Schütz
 * Licensed under the GPL Version 2 or later.
 * - http://potree.org/wp/?page_id=7
 * - http://www.gnu.org/licenses/gpl-3.0.html
 *
 */


/**
 * holds the WebGL context
 */
var gl = null;

/**
 *
 * @class
 */
function Potree(){
    this.camHandler = null;
}

/**
 * a list of all js files that must be included by Potree
 */
Potree.includes = [
    "config.js",
    "libs/mjs/mjs.js",
    "libs/WebglDebug/webgl-debug.js",
    "libs/other/other.js",
    "src/extensions/Array.js",
    "src/extensions/mjs.js",
    "src/extensions/String.js",
    "src/extensions/ArrayBuffer.js",
    "src/extensions/Float32Array.js",
    "src/utils/utils.js",
    "src/KeyListener.js",
    "src/MouseListener.js",
    "src/ResourceManager/TextureManager.js",
    "src/ResourceManager/MaterialManager.js",
    "src/shader/Shader.js",
    "src/utils/Plane.js",
    "src/utils/Frustum.js",
    "src/rendering/Renderer.js",
    "src/scenegraph/AABB.js",
    "src/scenegraph/SceneNode.js",
    "src/scenegraph/Camera.js",
    "src/scenegraph/Scene.js",
    "src/scenegraph/MeshNode.js",
    "src/scenegraph/Light.js",
    "src/scenegraph/Sphere.js",
//	"src/scenegraph/Plane.js",
    "src/objects/Mesh.js",
    "src/Viewport.js",
    "src/navigation/CamHandler.js",
    "src/navigation/FreeFlightCamHandler.js",
    "src/navigation/OrbitCamHandler.js",
    "src/Framebuffer.js",
    "src/FramebufferFloat32.js",
    "src/ResourceManager/ShaderManager.js",
    "src/utils/MeshUtils.js",
    "src/scenegraph/PointcloudOctreeSceneNode.js",
    "src/scenegraph/PointCloudSceneNode.js",
    "src/objects/PointCloud.js",
    "src/objects/PointcloudOctreeNode.js",
    "src/objects/PointcloudOctree.js",
    "src/materials/Material.js",
    "src/materials/WeightedPointSizeMaterial.js",
    "src/materials/FixedPointSizeMaterial.js",
    "src/materials/PointCloudMaterial.js",
    "src/materials/FlatMaterial.js",
    "src/materials/FilteredSplatsMaterial.js",
    "src/loader/POCLoader.js",
    "src/loader/PointAttributes.js",
    "src/loader/ProceduralPointcloudGenerator.js",
    "src/loader/PlyLoader.js",
    "src/utils/LRU.js"
];

Potree.Settings = new Object();

//settings
Potree.Settings.showBoundingBoxes = false;
Potree.Settings.LOD = true;
Potree.Settings.LODMultiplicator = 10.0;
Potree.Settings.pointSize = 1;
Potree.Settings.backgroundColor = [0,0,0,1];//[ 0.3, 0.3, 0.4, 1 ];
Potree.Settings.showGrid = false;
Potree.Settings.frustumCulling = true;

//other
Potree.testFBO = null;
Potree.gridSceneNode = null;
Potree.canvas = null;
Potree.initialized = false;


/**
 * includes the javascript file at {path} by adding a script tag to the document.
 *
 * @param path Potree library path
 * @returns.
 */
Potree.importScripts = function(path){
    var importText = "";
    for(var i = 0; i < Potree.includes.length; i++){
        var include = Potree.includes[i];
        //document.write("<scri" + "pt type=\"text/javascript\" src=\"" + path + "/" +include+"\"></scri" + "pt>");
        importText += "<scri" + "pt type=\"text/javascript\" src=\"" + path + "/" +include+"\"></scri" + "pt>\n";
    }
    document.write(importText);
};


Potree.isWebGLEnabled = function(canvas){
    var names = [ "webgl", "experimental-webgl", "moz-webgl", "webkit-3d" ];
    for ( var i = 0; names.length > i; i++) {
        try {
            gl = canvas.getContext(names[i], {
                antialias : false
            });
            if (gl) {
                break;
            }
        } catch (e) {
        }
    }
    if (!gl) {
        console.log("No known OpenGL context detected! Is it enabled?");
        return false;
    }

    return true;
};

/**
 *
 * @param canvas the canvas element for rendering.
 * Potree can only be intialized once.
 * @returns.
 */
Potree.init = function(canvas) {
    if(Potree.initialized){
        console.log("Potree has already been initialized");
        return true;
    }

    Potree.canvas = canvas;
    Potree.currentScene = new Scene("default");

    if(!Potree.initGL()){
        // init failed -> display error message
        var soSorry = document.createElement("div");
        var msg = "<br>Could not create a WebGL context. ";
        msg += "<br><br>Try using <a href='http://www.mozilla.org' style='color: red'>Firefox</a> ";
        msg += "or <a href='www.google.com/chrome/' style='color: red'>Chrome</a>.";
        msg += "<br>Other WebGL enabled browsers are not supported but they might work as well.";
        soSorry.innerHTML = msg;
        soSorry.style.fontSize = "large";
        soSorry.style.fontWeight = "bold";
        soSorry.style.color = "#FFF";
        soSorry.style.textShadow = "black 0 0 4px, black 0 0 4px, black 0 0 4px, black 0 0 4px, black 0 0 4px, black 0 0 4px";
        soSorry.style.textAlign = "center";
        soSorry.style.verticalAlign = "bottom";
        soSorry.style.height = "100%";
        canvas.parentNode.replaceChild(soSorry, canvas);

        return false;
    }

    {// register mouse and key listener
        var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x
        if (document.attachEvent){ //if IE (and Opera depending on user setting)
            document.attachEvent("on"+mousewheelevt,MouseListener.mouseWheel);
        }else if (document.addEventListener){ //WC3 browsers
            document.addEventListener(mousewheelevt, MouseListener.mouseWheel, false);
        }
        document.onkeydown = KeyListener.keyDown;
        document.onkeyup = KeyListener.keyUp;
        document.onkeypress = KeyListener.keyPress;
        document.onmousedown = MouseListener.mouseDown;
        document.onmouseup = MouseListener.mouseUp;
        document.onmousemove = MouseListener.mouseMove;
    }


    {// install cam handler
        Potree.camHandler = new FreeFlightCamHandler(Potree.currentScene.activeCamera);
        canvas.onfocus = function(){
            KeyListener.addListener(Potree.camHandler);
            MouseListener.addListener(Potree.camHandler);
        };

        canvas.onblur= function(){
            KeyListener.removeListener(Potree.camHandler);
            MouseListener.removeListener(Potree.camHandler);
        };
    }

    Potree.initialized = true;

    // shaders
    var drawTextureShader = new Shader("drawTexture", "drawTexture.vs", "drawTexture.fs");

    // materials
    var pointCloudMaterial = new PointCloudMaterial("pointCloud");

    Potree.mainLoop();

    return Potree.initialized;
};

/**
 * creates the WebGL context
 *
 */
Potree.initGL = function() {

    viewportWidth = Potree.canvas.width;
    viewportHeight = Potree.canvas.height;

    var names = [ "webgl", "experimental-webgl", "moz-webgl", "webkit-3d" ];
    for ( var i = 0; names.length > i; i++) {
        try {
            gl = Potree.canvas.getContext(names[i], {
                antialias : false
            });
            if (gl) {
                break;
            }
        } catch (e) {
        }
    }
    if (!gl) {
        console.log("No known OpenGL context detected! Is it enabled?");
        return false;
    }

//	if(Potree.useDebugContext){
//		 Logger.warn("using WebGLDebugUtils - debugcontext. Performance may suffer.");
//		 gl = WebGLDebugUtils.makeDebugContext(gl);
//	}

    // extensions
    if (!gl.getExtension("OES_texture_float")) {
        console.log("some functions require OES_texture_float extension");
        return false;
    }

    // basic settings
    var cColor = Potree.Settings.backgroundColor;
    gl.clearColor(cColor.r, cColor.g, cColor.b, cColor.a);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this.gridSceneNode = Potree.createGridNode();

    return true;
};

/**
 * a grid at the origin.
 *
 * @returns {SceneNode}
 */
Potree.createGridNode = function createGridNode() {
    // materials
    var matXAxis = new FlatMaterial("xAxis", [1.0, 0.0, 0.0, 1.0]);
    var matYAxis = new FlatMaterial("yAxis", [0.0, 1.0, 0.0, 1.0]);
    var matZAxis = new FlatMaterial("zAxis", [0.0, 0.0, 1.0, 1.0]);
//	var gridMaterial = new FlatMaterial("grid");
//	gridMaterial.setColor(new Colour(0.7, 0.7, 0.7, 1.0));

    var gridNode = new SceneNode("gridNode", null);
    var mGrid = MeshUtils.createGrid(1, 20, 20);
    var nGrid = new MeshNode("grid", mGrid, gridNode);

    // unfortunately, lineWidth is not supported/does not work so create 3 lines
    // instead of one thick line
    {
        var mXAxis = MeshUtils.createLine( [ 0, 0, 0 ], [ 1, 0, 0 ]);
        mXAxis.setMaterial(matXAxis);
        var nXAxis = new MeshNode("xAxis", mXAxis, gridNode);
        var nXAxis1 = new MeshNode("xAxis1", mXAxis, gridNode);
        nXAxis1.translate(0, 0, 0.0001);
        var nXAxis2 = new MeshNode("xAxis2", mXAxis, gridNode);
        nXAxis2.translate(0, 0, -0.0001);
    }

    {
        var mYAxis = MeshUtils.createLine( [ 0, 0, 0 ], [ 0, 1, 0 ]);
        mYAxis.setMaterial(matYAxis);
        var nYAxis = new MeshNode("yAxis", mYAxis, gridNode);
        var nYAxis1 = new MeshNode("yAxis1", mYAxis, gridNode);
        nYAxis1.translate(0, 0, 0.0001);
        var nYAxis2 = new MeshNode("yAxis2", mYAxis, gridNode);
        nYAxis2.translate(0, 0, -0.0001);
    }

    {
        var mZAxis = MeshUtils.createLine( [ 0, 0, 0 ], [ 0, 0, 1 ]);
        mZAxis.setMaterial(matZAxis);
        var nZAxis = new MeshNode("zAxis", mZAxis, gridNode);
        var nZAxis1 = new MeshNode("zAxis1", mZAxis, gridNode);
        nZAxis1.translate(0.0001, 0, 0);
        var nZAxis2 = new MeshNode("zAxis2", mZAxis, gridNode);
        nZAxis2.translate(-0.0001, 0, 0);
    }

    return gridNode;
};

/**
 * draws a frame to the canvas
 */
Potree.draw = function() {
    Potree.canvas.width = Potree.canvas.clientWidth;
    Potree.canvas.height = Potree.canvas.clientHeight;

    var scene = Potree.currentScene;
    var cam = scene.activeCamera;
    cam.aspectRatio = Potree.canvas.clientWidth / Potree.canvas.clientHeight;
    gl.viewport(0, 0, Potree.canvas.clientWidth, Potree.canvas.clientHeight);
    var cColor = Potree.Settings.backgroundColor;
    gl.clearColor(cColor.r, cColor.g, cColor.b, cColor.a);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    Renderer.render(scene);

    if(Potree.Settings.showGrid){
        Potree.gridSceneNode.render(cam);
    }

//	 window.mozRequestAnimationFrame(Potree.draw);
//	 window.webkitRequestAnimationFrame (Potree.draw);
    //setTimeout(Potree.draw, 0);
};


Potree.mainLoop = function mainLoop(){
    Potree.calculateTimeSinceLastFrame();

//	var pcl = Potree.currentScene.rootNode.children["test"];
//	if(pcl != null){
//		pcl.rotateY(timeSinceLastFrame*0.7);
//	}

    Potree.update(timeSinceLastFrame);
    Potree.draw();

    // with 0ms, interaction becomes a lot slower in firefox.
    setTimeout(mainLoop, 10);
};

var lastLoopTime = null;
var timeSinceLastFrame = null;
Potree.calculateTimeSinceLastFrame = function calculateTimeSinceLastFrame(){
    var newDrawTime = new Date().getTime();
    if (lastLoopTime != null) {
        timeSinceLastFrame = (newDrawTime - lastLoopTime) / 1000.0;
    }else{
        timeSinceLastFrame = 0;
    }
    lastLoopTime = new Date().getTime();

};

var fpsHistory = new Array();
Potree.update = function update(time){

    var fps = 1 / time;

    fpsHistory.push(fps);
    if(fpsHistory.length > 10){
        fpsHistory.splice(0, 1);
    }
    var mean = 0;
    for(var i = 0; i < fpsHistory.length; i++){
        mean += fpsHistory[i];
    }
    mean = mean / fpsHistory.length;

    Potree.currentScene.rootNode.addTime(time);
    PointcloudOctreeNode.nodesLoadedThisFrame = 0;

    Potree.camHandler.update(time);

    var pcl = Potree.currentScene.rootNode["test"];
    if(pcl != null){
        pcl.rotateY(time);
    }
};