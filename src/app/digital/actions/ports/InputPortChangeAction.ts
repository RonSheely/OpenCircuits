import {Action} from "core/actions/Action";

import {PortChangeAction} from "core/actions/ports/PortChangeAction";

import {Port} from "core/models/ports/Port";

import {DigitalComponent} from "digital/models/DigitalComponent";


/**
 * This code allows for the change in the number of input ports on a DigitalComponent.
 */
export class InputPortChangeAction extends PortChangeAction {
    protected obj: DigitalComponent;

    /**
     * This code constructs the obj with the new number of ports.
     *
     * @param obj    The object being changed.
     * @param target Number of ports.
     */
    public constructor(obj: DigitalComponent, target: number) {
        super(obj.getDesigner(), target);
        this.obj = obj;

        this.execute();
    }

    /**
     * Returns the objects input ports.
     *
     * @returns The objects input inports.
     */
    protected getPorts(): Port[] {
        return this.obj.getInputPorts();
    }

    /**
     * Changes the number of input ports on the object to the target count.
     *
     * @returns The object with the new number of ports.
     */
    public execute(): Action {
        super.execute();
        this.obj.setInputPortCount(this.targetCount);
        return this;
    }

    /**
     * Resets the number of input ports back to the initial count.
     *
     * @returns The object with the initial number of ports.
     */
    public undo(): Action {
        this.obj.setInputPortCount(this.initialCount);
        super.undo();
        return this;
    }

    public getName(): string {
        return "Input port Change";
    }
}
