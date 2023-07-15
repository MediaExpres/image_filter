export default function useReader(file: File | null) {
const reader = new FileReader();

if(file) reader.readAsDataURL(file);

return { reader };
}