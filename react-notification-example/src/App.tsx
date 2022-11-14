import { useNotification } from "./NotificationsHook";

function App() {
  const notification = useNotification();
  return (
    <div className="main">
      <div className="container">
        <h1>Notifications</h1>
        <button
          onClick={() =>
            notification.info({
              title: "Info",
              description: "My info description",
            })
          }
        >
          Open info notification
        </button>
        <br />
        <button
          onClick={() =>
            notification.success({
              title: "Success",
              description: "My success description",
            })
          }
        >
          Open success notification
        </button>
        <br />
        <button
          onClick={() =>
            notification.error({
              title: "Error",
              description: "My error description",
            })
          }
        >
          Open error notification
        </button>
        <br />
        <button
          onClick={() =>
            notification.warning({
              title: "Warning",
              description: "My warning description",
            })
          }
        >
          Open warning notification
        </button>
      </div>
    </div>
  );
}

export default App;
