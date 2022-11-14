import { useNotification } from "./NotificationHook";

function App() {
  const notify = useNotification();

  return (
    <div className="app">
      <h1>Notifications</h1>

      <button
        onClick={() =>
          notify.info({
            title: "Info",
            description: "Description notification",
          })
        }
      >
        Open info notification
      </button>

      <button
        onClick={() =>
          notify.success({
            title: "Success",
            description: "Description notification",
          })
        }
      >
        Open Success notification
      </button>
      <button
        onClick={() =>
          notify.error({
            title: "Error",
            description: "Description notification",
          })
        }
      >
        Open Error notification
      </button>
      <button
        onClick={() =>
          notify.warning({
            title: "Warning",
            description: "Description notification",
          })
        }
      >
        Open warning notification
      </button>
    </div>
  );
}

export default App;
