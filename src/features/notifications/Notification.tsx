type NotificationProps = {
  type?: 'neutral' | 'success' | 'error';
  text: string;
  title: string;
  onRemove: () => void;
};

function Notification({
  type = 'neutral',
  text,
  title,
  onRemove,
}: NotificationProps) {
  return (
    <div id={type}>
      <h4>{title}</h4>
      <p>{text}</p>
      <button onClick={onRemove}>remove</button>
    </div>
  );
}

export default Notification;
