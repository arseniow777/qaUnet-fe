const BASE_URL = import.meta.env.VITE_API_URL;

export async function predictModel(imageFile, model) {
  const form = new FormData();
  form.append("image", imageFile);
  form.append("model", model);

  const start = performance.now();
  const res = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    body: form,
  });
  const elapsed = ((performance.now() - start) / 1000).toFixed(2);

  if (!res.ok) throw new Error("Prediction failed");
  const data = await res.json();
  return { data, elapsed };
}
