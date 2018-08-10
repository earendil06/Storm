import { Selector } from 'testcafe'; // first import testcafe selectors

fixture `Getting Started`// declare the fixture
    .page `../terminal.html`;  // specify the start page


//then create a test and place your code there
test('My first test', async t => {
    await t.click("#inputLine")
        .typeText('#inputLine', 'help')
        .expect(Selector('.input-line').length).eql(0)
        .pressKey('enter').wait(1000);
});