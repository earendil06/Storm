import {ClientFunction, Selector} from 'testcafe';
import {StaticHelpers} from "../../StaticHelpers";

fixture`Getting Started`
    .page`../../../index.html`;

function outputCommandText() {
    return Selector('#command-result-input').innerText;
}


function outputResult() {
    return Selector('#command-result-output');
}

test('all blocks a good', async t => {

    const getBlocks = ClientFunction(() => {
        return StaticHelpers.getBlocks();
    }, { dependencies: { StaticHelpers } });

    getBlocks().then(async blocks => {
        for (let i = 0; i < blocks.length; i++) {
            let name = blocks[i];
            await t
                .typeText('#inputLine', `block ${name}`)
                .pressKey('enter')
                .expect(outputCommandText()).eql(`block ${name}`);
            // .expect(outputResult().getAttribute('template')).eql('block');
        }
    });

});