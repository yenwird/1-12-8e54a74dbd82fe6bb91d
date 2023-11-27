import { app, InvocationContext } from "@azure/functions";
import * as https from "https";
import * as df from 'durable-functions';
import { ActivityHandler, OrchestrationContext, OrchestrationHandler } from 'durable-functions';

const main => () => {
    
};

export async function serviceBusQueueTrigger(message: unknown, context: InvocationContext): Promise<void> {
    context.log('Service bus queue function processed message:', message);
    const client = df.getClient(context);
    const instanceId: string = await client.startNew("main", message);
    context.log(`Started orchestration with ID = '${instanceId}'.`);
}
app.serviceBusQueue('1-12-8e54a74dbd82fe6bb91d', {
    connection: 'azureQueueConnection',
    queueName: '1-12-8e54a74dbd82fe6bb91d',
    handler: serviceBusQueueTrigger,
    extraInputs: [df.input.durableClient()],
});
