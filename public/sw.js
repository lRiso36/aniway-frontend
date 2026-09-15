

self.addEventListener('push', (event) => {
    const data = event.data.json();

    //dont terminate early
    event.waitUntil(
        self.registration.showNotifcation(data.title, {
            body: data.body,
            icon: data.icon,
            data: { url: data.url }
        })
    );
});

//on click
self.addEventListener('notificationClick', (event) => {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((windowClients) => {
            for (const client of windowClients) {
                if (client.url === event.notification.data.url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (client.openWindow) {
                return clients.openWindow(event.notification.data.url)
            }
        })
    );
});
