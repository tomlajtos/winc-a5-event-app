import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "node:dns";

// use node:dns module to set resolved order to IPv4 first
dns.setDefaultResultOrder("ipv4first");
// method-1: OS dependent (getadrrinfo)
const options = { family: 0, all: true };
dns.lookup("localhost", options, (err, addresses) => {
  if (err) {
    console.error(err);
  }
  console.log(
    `===\nChecking the order of DNS-resolved addresses for 'localhost'\n[method-1:dns.lookup() --- method-2:dns.resolve()]:`,
  );
  addresses.map((a, i) =>
    console.log(`  ${i}: IPv${a.family},`, `'${a.address}'`),
  );
  console.log("---");
});

// method-2: network dependent DNS query
dns.resolve("localhost", "ANY", (err, records) => {
  if (err) {
    console.error(err);
  }
  records.map((r, i) => {
    const type = r.type === "A" ? "IPv4" : r.type === "AAAA" ? "IPv6" : "other";
    console.log(
      `  ${i}: '${r.address}'  \n    > type: ${type}\n    > TTL: ${r.ttl} (sec)`,
    );
  });
  console.log("===");
});

export default defineConfig({
  plugins: [react()],
  server: {
    open: false,
    host: "127.0.0.1",
    port: 5000,
    strictPort: false,
  },
});
