// Carte utilisée dans le Dashboard pour afficher une statistique

export default function DashboardCard({ icon, title, value, color }) {
  return (
    <div className="col-12 col-sm-6 col-lg-3 mb-3">
      <div className="card shadow-sm h-100 border-0">
        <div className="card-body d-flex align-items-center">
          <div
            className={`rounded-circle d-flex align-items-center justify-content-center me-3`}
            style={{
              width: 56,
              height: 56,
              backgroundColor: color,
              color: "#fff",
              fontSize: "1.5rem",
            }}
          >
            {icon}
          </div>
          <div>
            <p className="text-muted mb-0 small fs-6">{title}</p>
            <h4 className="mb-0 fw-bold fs-3">{value}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
