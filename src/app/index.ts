import '../style/app.css';
import * as querystring from 'querystring';
import { ScrcpyClient } from './client/ScrcpyClient';
import { ShellClient } from './client/ShellClient';
import { DroidDeviceTrackerClient } from './client/DroidDeviceTrackerClient';
import { ScrcpyStreamParams } from '../common/ScrcpyStreamParams';
import { ShellParams } from '../common/ShellParams';
import { DevtoolsClient } from './client/DevtoolsClient';
import { DevtoolsParams } from '../common/DevtoolsParams';

window.onload = function (): void {
    const hash = location.hash.replace(/^#!/, '');
    const parsedQuery = querystring.parse(hash);
    const action = parsedQuery.action;
    if (action === ScrcpyClient.ACTION && typeof parsedQuery.udid === 'string') {
        new ScrcpyClient(parsedQuery as ScrcpyStreamParams);
    } else if (action === ShellClient.ACTION && typeof parsedQuery.udid === 'string') {
        ShellClient.start(parsedQuery as ShellParams);
    } else if (action === DevtoolsClient.ACTION) {
        DevtoolsClient.start(parsedQuery as DevtoolsParams);
    } else {
        DroidDeviceTrackerClient.start();
    }
};
