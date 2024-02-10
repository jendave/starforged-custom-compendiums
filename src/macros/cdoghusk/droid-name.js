// Macro by David Hudson under the MIT License.

function printMessage(message) {
    let chatData = { content: message, };
    ChatMessage.create(chatData, {})
};

try {

    let title = "<h3>Star Wars: New Droid Name</h3>";

    function droidName() {
        let result = '';
        let sequence = "";
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charactersLength = characters.length;
        result = characters.charAt(Math.floor(Math.random() * characters.length));

        for (let i = 0; i < 2; i++) {
            sequence = sequence.concat(Math.floor(Math.random() * 10));
        }
        return result + sequence;
    }

    let result = droidName();
    let message = result;

    // Print the message
    printMessage(title + message);

}
catch (e) {
    console.log(e);
}
