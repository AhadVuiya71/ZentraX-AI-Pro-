/**
 * ZentraX AI Pro - Master Core Engine
 * Version: 3.0.0 (Clean Architecture)
 * ---------------------------------------------------------
 * এই কোডটি ব্রাউজার কম্প্যাটিবিলিটির জন্য অপ্টিমাইজড।
 */

const ZentraX_Core = {
    version: "3.0.0",
    isInitialized: false,

    // ১. ইভেন্ট বাস: সব নোড একে অপরের সাথে কানেক্ট করবে
    subscribers: {},
    subscribe(event, callback) {
        if (!this.subscribers[event]) this.subscribers[event] = [];
        this.subscribers[event].push(callback);
    },
    publish(event, data) {
        if (!this.subscribers[event]) return;
        this.subscribers[event].forEach(cb => cb(data));
    },

    // ২. ইঞ্জিন ইনিশিয়াল বুটআপ
    init() {
        if (this.isInitialized) return;
        console.log("Kernel: ZentraX AI Pro Initializing...");
        
        // এখানে সিস্টেমের মূল খুঁটি তৈরি হচ্ছে
        this.isInitialized = true;
        this.publish("SYSTEM_READY", { status: "ONLINE", time: new Date().toISOString() });
    }
};

// ৩. নোড রেজিস্ট্রেশন ও অটোনোমাস লজিক
const AtmosEngine = {
    init() {
        ZentraX_Core.subscribe("SYSTEM_READY", () => {
            console.log("AtmosEngine: Synchronized and Operational.");
        });
    }
};

const LoadBalancer = {
    init() {
        ZentraX_Core.subscribe("SYSTEM_READY", () => {
            console.log("LoadBalancer: Network Traffic Normalized.");
        });
    }
};

// ৪. সিস্টেম স্টার্টআপ সিকোয়েন্স
function bootSystem() {
    AtmosEngine.init();
    LoadBalancer.init();
    ZentraX_Core.init();
}

// ব্রাউজার লোড হলে ইঞ্জিন চালু হবে
window.addEventListener('load', bootSystem);
