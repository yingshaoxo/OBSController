import { Helmet } from 'react-helmet';
import { useEffect } from 'react';

const ImportMyScript = (resourceUrl: string, timeout: number) => {
    useEffect(() => {
        setTimeout(() => {
            const script = document.createElement('script');
            script.src = resourceUrl;
            script.async = true;
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            }
        }, timeout);
    }, [resourceUrl]);
};

export function ChracterView() {

    ImportMyScript('https://unpkg.com/three@0.133.0/build/three.js', 0);
    ImportMyScript('https://unpkg.com/three@0.133.0/examples/js/loaders/GLTFLoader.js', 1000);
    ImportMyScript('https://unpkg.com/@pixiv/three-vrm@0.6.7/lib/three-vrm.js', 1000)
    ImportMyScript('https://unpkg.com/three@0.133.0/examples/js/controls/OrbitControls.js', 1000)

    ImportMyScript('https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1635989137/holistic.js', 1000)
    ImportMyScript('https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js', 1000)
    ImportMyScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js', 1000)
    ImportMyScript('https://cdn.jsdelivr.net/npm/kalidokit@1.0/dist/kalidokit.umd.js', 1000)

    ImportMyScript('/assets/chracter_script.js', 1000)

    return (
        <div>
            <Helmet>
                {/* <script src="https://unpkg.com/three@0.133.0/build/three.js"></script> */}
                {/* <script src="https://unpkg.com/three@0.133.0/examples/js/loaders/GLTFLoader.js"></script> */}
                {/* <script src="https://unpkg.com/three@0.133.0/examples/js/controls/OrbitControls.js"></script> */}
                {/* <script src="https://unpkg.com/@pixiv/three-vrm@0.6.7/lib/three-vrm.js"></script> */}
                {/* <script src="https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1635989137/holistic.js"
                    crossOrigin="anonymous"></script> */}

                {/* <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js" crossOrigin="anonymous"></script> */}
                {/* <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossOrigin="anonymous"></script> */}
                {/* <script src="https://cdn.jsdelivr.net/npm/kalidokit@1.0/dist/kalidokit.umd.js"></script> */}
                <link type="text/css" rel="stylesheet" href="/assets/chracter_style.css" />

                {/* <script src="/assets/chracter_script.js"></script> */}
            </Helmet>
            <div
                style={
                    {
                        height: '100%',
                        width: '100%',
                    }
                }
            >
                <div className="preview">
                    <video className="input_video draggable"
                        style={{
                            display: 'none',
                        }}
                    ></video>
                    <canvas className="guides"></canvas>
                </div>
            </div>
        </div>
    );
}