import EventStream from 'eventing-bus/lib/event_stream';
import {DumpState} from './DumpState';

export class GameLogic  {

  constructor(gameState) {
    this.gameState = gameState;
    this.eventBus = gameState.eventBus;
  }

  init(){
    this.eventBus.on('doMoveCurrentPlayer', this.moveCurrentPlayer.bind(this));
    this.eventBus.on('doNextTour', this.nextTour.bind(this));
  }

  moveCurrentPlayer(steps) {
    let currentPlayer = this.gameState.getCurrentPlayer();
    this.eventBus.publish('beforeCurrentMovePlayer', currentPlayer);
    this.eventBus.publish('beforeMovePlayer', currentPlayer);
    currentPlayer.position += steps;
    this.eventBus.publish('afterMoveCurrentPlayer', currentPlayer);
    this.eventBus.publish('afterMovePlayer', currentPlayer);
    this.gameState.save();
  }

  nextTour() {
    this.eventBus.publish('beforeNextTour', this.state);
    this.gameState.state.tour++;
    this.eventBus.publish('afterNextTour', this.state);
    this.gameState.save();
  }

}
