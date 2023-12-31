import { DrawQuestApp } from "../main";
import type {QuestShape} from "./utils"

export class Renderer extends EventTarget {
    // holds the current object being edited
    // shadow context used to (hopefully) speed-up rerenders
  name = "renderer"
  _Qcontext: CanvasRenderingContext2D;
  // the objects array holds the shapes on the canvas
  objects: QuestShape[];
  // an object-reference to the app 
  appRef : DrawQuestApp;

  constructor (app: DrawQuestApp ) {
    super();
    this.objects = [];
    this._Qcontext = (app.canvas.cloneNode() as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
    this.appRef = app;
  }

  initialise() {
    // on rerender event => clear Qcontext and use it to redraw the actual context
    this.addEventListener("rerender", (e)=>{
      let context = this.appRef.canvas.getContext("2d") as CanvasRenderingContext2D;
      this._Qcontext.clearRect(0, 0, this._Qcontext.canvas.width, this._Qcontext.canvas.height);
      //@ts-ignore
      let tools = e.detail.tools;
      for (let shape of this.objects) {
        tools[shape.type].draw.call(this._Qcontext, shape)
      }
      let image = this._Qcontext.getImageData(0, 0, this._Qcontext.canvas.width, this._Qcontext.canvas.height); 
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.putImageData(image, 0, 0);
    });

    this.addEventListener("select-object", ()=>{
        //
    });

  }
}

