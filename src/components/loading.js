export default function Loading({ type }) {
    const types = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
    ];
    let className =
        'spinner-border text-' + (types.includes(type) ? type : 'dark');
    return (
        <div className="d-flex h-100 w-100 justify-content-center align-items-center">
            <div className={className} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
