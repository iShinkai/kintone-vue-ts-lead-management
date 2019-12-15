declare module "vuedraggable" {
  import Vue, { ComponentOptions } from "vue";

  export interface DraggedContext<T> {
    index: number;
    futureIndex: number;
    element: T;
  }

  export interface DropContext<T> {
    index: number;
    component: Vue;
    element: T;
  }

  export interface Rectangle {
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
  }

  export interface MoveEvent<T> {
    originalEvent: DragEvent;
    dragged: Element;
    draggedContext: DraggedContext<T>;
    draggedRect: Rectangle;
    related: Element;
    relatedContext: DropContext<T>;
    relatedRect: Rectangle;
    from: Element;
    to: Element;
    willInsertAfter: boolean;
    isTrusted: boolean;
  }
  export interface DropEvent {
    from: Element;
    item: Element;
    newDraggableIndex: number;
    newIndex: number;
    oldDraggableIndex: number;
    oldIndex: number;
    originalEvent: DragEvent;
    path: Element[];
    srcElement: Element;
    target: Element;
    to: Element;
    type: string;
  }

  const draggableComponent: ComponentOptions<Vue>;

  export default draggableComponent;
}
