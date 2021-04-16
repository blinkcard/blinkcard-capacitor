declare module '@capacitor/core' {
    interface PluginRegistry {
	BlinkCardCapacitorPlugin: {
			scanWithCamera: Function;
		};
    }
}

export default {}