import { useState, useEffect, MouseEventHandler } from 'react'
import { useCanvas } from './canvas'
import { Rectangle } from '@/lib/types';
import { getShape } from '@/state/shapes'
import { atom, useAtom } from 'jotai'

export const useRectangle = (id: string) => {
  let {canvasRef} = useCanvas()
  let rectangleAtom = getShape(id);
  let [selection, setSelection] = useState(false);
  let [rect, setRect] = useAtom(rectangleAtom);

  const resizeHandler: MouseEventHandler = (e) => {
    // 5asà origin (x,y), so we need to calculate the diff between last position wfirst position
    let canvasRect = canvasRef.current.getClientBoundingRect()
    // Cursor position relative to canvas
    let cprc = [e.clientX-canavasRect.left, e.clientY-canvas.top];

    if(rect.x>cprc[0]) setRect((rect)=>({...rect, x: cprc[0], w: rect.x-cprc[0]}))
    if(rect.y>cprc[1]) setRect((rect)=>({...rect, y: cprc[1], h: rect.y-cprc[1]}))
    if(rect.x<cprc[0] && rect.y<cprc[1]) setRect((rect)=>({...rect, h: cprc[1]-rect.y, w: cprc[0]-rect[0]}))
  }

  return {
    rectProps: (rect as Rectangle)
  }
}
