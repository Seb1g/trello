import React, {useState} from "react";

const DropdownButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const recentItems = [
    {
      id: 1,
      image: "https://via.placeholder.com/40",
      title: "Рабочее пространство Trello",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/40",
      title: "Рабочее пространство Trello",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/40",
      title: "Рабочее пространство Trello",
    },
  ];

  return (
    <div style={{position: "relative", display: "inline-block"}}>
      <button
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          cursor: "pointer",
          height: "32px",
        }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
      >
        Recent
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            marginTop: "0.5rem",
            width: "16rem",
            backgroundColor: "white",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "0.5rem",
            zIndex: 10,
          }}
        >
          <ul>
            {recentItems.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                    marginRight: "0.75rem",
                  }}
                />
                <div>
                  <div style={{fontWeight: "600"}}>{item.id}</div>
                  <div style={{color: "#4b5563", fontSize: "0.875rem"}}>{item.title}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
