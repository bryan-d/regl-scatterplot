/**
 * Check if all GL extensions are supported and enabled and warn otherwise
 * @param   {import('regl').Regl}  regl  Regl instance to be tested
 * @param   {boolean}  silent  If `true` the function will not print `console.warn` statements
 * @return  {boolean}  If `true` all required GL extensions are supported
 */
declare function checkReglExtensions(regl: import('regl').Regl, silent: boolean): boolean;
/**
 * Create a new Regl instance with `GL_EXTENSIONS` enables
 * @param   {HTMLCanvasElement}  canvas  Canvas element to be rendered on
 * @return  {import('regl').Regl}  New Regl instance
 */
export function createRegl(canvas: HTMLCanvasElement): import('regl').Regl;
export function createRenderer(options?: Partial<import('./types').RendererOptions>): {
    /**
     * Get the associated canvas element
     * @return {HTMLCanvasElement} The associated canvas element
     */
    readonly canvas: HTMLCanvasElement;
    /**
     * Get the associated Regl instance
     * @return {import('regl').Regl} The associated Regl instance
     */
    readonly regl: import("regl").Regl;
    /**
     * Get the gamma value
     * @return {number} The gamma value
     */
    gamma: number;
    /**
     * Get whether the browser supports all necessary WebGL features
     * @return {boolean} If `true` the browser supports all necessary WebGL features
     */
    readonly isSupported: boolean;
    render: (draw: () => any, targetCanvas: HTMLCanvasElement) => void;
    onFrame: (draw: () => any) => () => void;
    refresh: () => void;
    destroy: () => void;
};
/**
 * @deprecated Please use `scatterplot.createTextureFromUrl(url)`
 *
 * Create a Regl texture from an URL.
 * @param   {import('regl').Regl}  regl  Regl instance used for creating the texture.
 * @param   {string}  url  Source URL of the image.
 * @return  {Promise<import('regl').Texture2D>}  Promise resolving to the texture object.
 */
export function createTextureFromUrl(regl: import('regl').Regl, url: string, timeout?: number): Promise<import('regl').Texture2D>;
declare function createScatterplot(initialProperties?: Partial<import('./types').Properties>): {
    /**
     * Get whether the browser supports all necessary WebGL features
     * @return {boolean} If `true` the browser supports all necessary WebGL features
     */
    readonly isSupported: boolean;
    clear: () => void;
    createTextureFromUrl: (url: string, timeout?: number) => Promise<import("regl").Texture2D>;
    deselect: ({ preventEvent }?: {
        preventEvent?: boolean;
    }) => void;
    destroy: () => void;
    draw: (newPoints: import('./types').Points, options?: import('./types').ScatterplotMethodOptions['draw']) => Promise<void>;
    filter: (pointIdxs: number | number[], { preventEvent }?: import('./types').ScatterplotMethodOptions['filter']) => Promise<any>;
    get: <Key extends "canvas" | "points" | "camera" | "regl" | "pointColor" | "pointColorActive" | "pointColorHover" | "pointOutlineWidth" | "pointSize" | "pointSizeSelected" | "pointConnectionColor" | "pointConnectionColorActive" | "pointConnectionColorHover" | "pointConnectionOpacity" | "pointConnectionOpacityActive" | "pointConnectionSize" | "pointConnectionSizeActive" | "pointConnectionMaxIntPointsPerSegment" | "pointConnectionTolerance" | "pointConnectionColorBy" | "pointConnectionOpacityBy" | "pointConnectionSizeBy" | "lassoColor" | "lassoLineWidth" | "lassoMinDelay" | "lassoMinDist" | "lassoClearEvent" | "lassoInitiator" | "lassoInitiatorParentElement" | "lassoOnLongPress" | "lassoLongPressTime" | "lassoLongPressAfterEffectTime" | "lassoLongPressEffectDelay" | "lassoLongPressRevertEffectTime" | "cameraTarget" | "cameraDistance" | "cameraRotation" | "cameraView" | "renderer" | "syncEvents" | "version" | "lassoInitiatorElement" | "performanceMode" | "opacityByDensityDebounceTime" | "pointsInView" | "isDestroyed" | "isPointsDrawn" | "isPointsFiltered" | "hoveredPoint" | "filteredPoints" | "selectedPoints" | keyof import("./types").BaseOptions>(property: Key) => import("./types").Properties[Key];
    getScreenPosition: (pointIdx: number) => [number, number] | undefined;
    hover: (point: number, { showReticleOnce, preventEvent }?: import('./types').ScatterplotMethodOptions['hover']) => void;
    redraw: () => void;
    refresh: () => void;
    reset: (args_0?: Partial<{
        preventEvent: boolean;
    }>) => void;
    select: (pointIdxs: number | number[], { merge, preventEvent }?: import('./types').ScatterplotMethodOptions['select']) => void;
    set: (properties: Partial<import('./types').Settable>) => void;
    export: () => ImageData;
    subscribe: <EventName extends "view" | "select" | "focus" | "destroy" | "points" | "lassoEnd" | "deselect" | "init" | "backgroundImageReady" | "unfilter" | "lassoStart" | "transitionStart" | "pointConnectionsDraw" | "lassoExtend" | "pointOver" | "pointOut" | "transitionEnd" | "draw">(eventName: EventName, eventHandler: (payload: import("./types").EventMap[EventName]) => void, times?: number) => void;
    unfilter: ({ preventEvent }?: import('./types').ScatterplotMethodOptions['filter']) => Promise<any>;
    unsubscribe: (eventName: "view" | "select" | "focus" | "destroy" | "points" | "lassoEnd" | "deselect" | "init" | "backgroundImageReady" | "unfilter" | "lassoStart" | "transitionStart" | "pointConnectionsDraw" | "lassoExtend" | "pointOver" | "pointOut" | "transitionEnd" | "draw") => void;
    view: (cameraView: number[], { preventEvent }?: import('./types').ScatterplotMethodOptions['preventEvent']) => void;
    zoomToLocation: (target: number[], distance: number, options?: import('./types').ScatterplotMethodOptions['draw']) => Promise<void>;
    zoomToArea: (rect: import('./types').Rect, options?: import('./types').ScatterplotMethodOptions['draw']) => Promise<void>;
    zoomToPoints: (pointIdxs: number[], options?: import('./types').ScatterplotMethodOptions['zoomToPoints']) => Promise<void>;
    zoomToOrigin: (options?: import('./types').ScatterplotMethodOptions['draw']) => Promise<void>;
};
export { checkReglExtensions as checkSupport, createScatterplot as default };
