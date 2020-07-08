/*
const {MailSlurp} = require("mailslurp-client");
const api = new MailSlurp({apiKey: "redacted"});
jest.setTimeout(120000);

describe("client extra methods", async () => {
it("can get inboxes for test user", async () => {
const inboxes = await api.getInboxes();
expect(inboxes).not.toBeNull();
});
it("can create an inbox, fetch it, and delete it", async () => {
const inbox = await api.createInbox();
expect(inbox).not.toBeNull();
expect(inbox.id).not.toBeNull();
const fetchedInbox = await api.getInbox(inbox.id);
expect(inbox).toMatchObject(fetchedInbox);
const response = await api.deleteInbox(inbox.id);
expect(response).not.toBeNull();
});
it("can send emails and then get them", async () => {
const body = "test-email-body-" + Date.now();
const subject = "test-email-subject-" + Date.now();
const inbox = await api.createInbox();
await api.sendEmail(inbox.id, {
body,
subject,
to: [inbox.emailAddress],
});
// now get said email
const messages = await api.getEmails(inbox.id, {
limit: 1,
minCount: 1,
retryTimeout: 120000,
since: new Date()
});
expect(messages.length).toEqual(1);
const email = await api.getEmail(messages[0].id);
expect(email.subject).toBe(subject);
expect(email.body.trim()).toBe(body.trim());
expect(email.headers).toBeTruthy();

// now delete
const deleteRes = await api.deleteInbox(inbox.id)
expect(deleteRes.status).toEqual(204)
})
});
*/