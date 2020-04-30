const action = () =>
    new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            clearTimeout(timer);
            if (Math.random() > 0.5) {
                resolve("success");
            } else {
                reject("error");
            }
        }, 2000);
    });
