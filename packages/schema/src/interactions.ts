export type ActionType =
  | 'navigation.push'
  | 'navigation.back'
  | 'open.modal'
  | 'close.modal'
  | 'form.submit'
  | 'link.external'
  | 'none';

export interface InteractionAction {
  type: ActionType;
  payload?: any;
}

export interface InteractionEvents {
  onClick?: InteractionAction;
  onHoverEnter?: InteractionAction;
  onHoverLeave?: InteractionAction;
}