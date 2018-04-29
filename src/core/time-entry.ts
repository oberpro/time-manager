import { DateTime } from "./datetime";
import { Break } from "./break";
import { WorkLocation } from "./work-location";
import { Work } from "./work";

export class TimeEntry {
    id: string;
    private work: Work[];
    private break: Break[];
    private comment: string = '';
    private location: WorkLocation = null;

    constructor() {

    }
}