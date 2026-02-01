import { Slide, Alert } from "@mui/material";
import { Toast } from "./toast.type";

export default function ToastContainer({ toasts }: { toasts: Toast[] }) {
    return (
        <div className="fixed min-w-[20%] max-w-[30%] top-4 right-4 z-[1500] flex flex-col gap-2">
            {toasts.map((t) => (
                <Slide
                    key={t.id}
                    direction="left"
                    in
                    mountOnEnter
                    unmountOnExit
                >
                    <Alert
                        severity={t.severity}
                        variant="standard"
                        onClose={() => { }}
                    >
                        {t.message}
                    </Alert>
                </Slide>
            ))}
        </div>
    );
}
