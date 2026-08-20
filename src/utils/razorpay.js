/**
 * Razorpay Payment Gateway Utility
 * Dynamically loads Razorpay checkout script and orchestrates transactions.
 */

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

/**
 * Loads the official Razorpay checkout script if not already present on window.
 * @returns {Promise<boolean>}
 */
export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK');
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

/**
 * Saves completed transaction in localStorage for audit trail
 */
export function saveTransactionRecord(txData) {
  try {
    const existing = JSON.parse(localStorage.getItem('nainix_payment_transactions') || '[]');
    existing.unshift({
      ...txData,
      savedAt: new Date().toISOString()
    });
    localStorage.setItem('nainix_payment_transactions', JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    console.warn('Could not save transaction to local history:', e);
  }
}

/**
 * Initiates Razorpay Standard Checkout popup.
 * 
 * @param {Object} options
 * @param {string} [options.keyId] - Razorpay Public Key ID
 * @param {number} options.amount - Amount in INR (e.g. 50)
 * @param {string} [options.currency="INR"]
 * @param {string} [options.name="exam.nainix.me"]
 * @param {string} [options.description="Full Board Pass - All Subjects 1 Year"]
 * @param {string} [options.image]
 * @param {Object} [options.prefill] - { name, email, contact }
 * @param {Object} [options.notes] - Custom metadata
 * @param {Function} options.onSuccess - Callback({ razorpay_payment_id, razorpay_order_id, razorpay_signature })
 * @param {Function} [options.onError] - Callback(error)
 * @param {Function} [options.onDismiss] - Callback when user closes Razorpay modal
 */
export async function initiateRazorpayPayment({
  keyId,
  amount = 50,
  currency = 'INR',
  name = 'exam.nainix.me',
  description = 'Full Board Pass (All Subjects & Mock Tests)',
  image,
  prefill = {},
  notes = {},
  onSuccess,
  onError,
  onDismiss
}) {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    const err = new Error('Razorpay SDK failed to load. Please check your internet connection.');
    if (onError) onError(err);
    throw err;
  }

  // Fallback public test key if env not configured
  const effectiveKey = keyId || 
    import.meta.env?.VITE_RAZORPAY_KEY_ID || 
    'rzp_test_51MockExamNainix';

  const rzpOptions = {
    key: effectiveKey,
    amount: Math.round(Number(amount) * 100), // Amount in paise
    currency: currency || 'INR',
    name: name || 'exam.nainix.me',
    description: description || 'All Subjects & Mock Tests Pass',
    ...(image ? { image } : {}),
    prefill: {
      name: prefill.name || 'Board Student',
      email: prefill.email || 'student@nainix.me',
      contact: prefill.contact || '9876543210',
      ...(prefill.method ? { method: prefill.method } : {})
    },
    notes: {
      platform: 'exam.nainix.me',
      passType: 'Full Board Pass',
      ...notes
    },
    theme: {
      color: '#0072f5',
      backdrop_color: 'rgba(15, 23, 42, 0.75)'
    },
    modal: {
      ondismiss: () => {
        if (onDismiss) onDismiss();
      },
      confirm_close: true,
      animation: true
    },
    handler: function (response) {
      // Payment Successful
      const txData = {
        paymentId: response.razorpay_payment_id || `pay_${Date.now()}`,
        orderId: response.razorpay_order_id || `order_${Date.now()}`,
        signature: response.razorpay_signature || '',
        amount,
        currency,
        timestamp: new Date().toISOString(),
        prefill
      };

      saveTransactionRecord(txData);

      if (onSuccess) {
        onSuccess(txData);
      }
    }
  };

  try {
    const rzp = new window.Razorpay(rzpOptions);

    rzp.on('payment.failed', function (response) {
      console.error('Razorpay Payment Failed:', response.error);
      if (onError) {
        onError({
          code: response.error?.code,
          description: response.error?.description,
          source: response.error?.source,
          step: response.error?.step,
          reason: response.error?.reason
        });
      }
    });

    rzp.open();
    return rzp;
  } catch (error) {
    console.error('Error opening Razorpay checkout:', error);
    if (onError) onError(error);
    throw error;
  }
}
