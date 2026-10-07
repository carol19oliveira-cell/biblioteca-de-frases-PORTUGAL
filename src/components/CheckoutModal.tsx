/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, CreditCard, Smartphone, Sparkles, CheckCircle2 } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
}

export default function CheckoutModal({ isOpen, onClose, price }: CheckoutModalProps) {
  const [step, setStep] = useState<"form" | "pay" | "success">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"mbway" | "card">("mbway");
  const [isVerifying, setIsVerifying] = useState(false);

  // Form submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Por favor, preencha o seu nome e e-mail.");
      return;
    }
    setStep("pay");
  };

  // Simulating payment verification
  const handleVerifyPayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep("success");
    }, 2000);
  };

  const resetModal = () => {
    setStep("form");
    setName("");
    setEmail("");
    setPhone("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetModal}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-brand-card overflow-hidden shadow-2xl shadow-brand-orange/10 z-10"
          >
            {/* Top orange decorative gradient line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-brand-orange to-brand-amber" />

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/[0.05]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <span className="text-sm font-semibold tracking-wide text-white uppercase font-display">
                  Ambiente Seguro
                </span>
              </div>
              <button
                onClick={resetModal}
                className="p-1.5 rounded-full hover:bg-white/[0.05] text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Switcher */}
            <div className="p-6">
              {step === "form" && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <div className="text-center mb-6">
                    <span className="text-xs font-mono font-medium text-brand-orange uppercase">
                      Passo 1 de 2
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      Dados de Faturação & Acesso
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Insira os dados corretos para receber as aulas e os materiais em PDF no e-mail.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: João Silva"
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                        E-mail de Acesso
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: o.seu.email@gmail.com"
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                        Telemóvel / WhatsApp (Para apoio / opcional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ex: +351 912 345 678"
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber font-bold text-white text-base hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-brand-orange/20 flex justify-center items-center gap-2"
                    >
                      Ir para o Pagamento • € {price.toFixed(2).replace(".", ",")}
                    </button>
                  </form>
                </motion.div>
              )}

              {step === "pay" && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <span className="text-xs font-mono font-medium text-brand-orange uppercase">
                      Passo 2 de 2
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      Escolha o método de pagamento
                    </h3>
                  </div>

                  {/* Selector tab */}
                  <div className="grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-xl border border-white/[0.05]">
                    <button
                      onClick={() => setPaymentMethod("mbway")}
                      className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        paymentMethod === "mbway"
                          ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Smartphone className="w-4.5 h-4.5" />
                      MB WAY (Imediato)
                    </button>
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        paymentMethod === "card"
                          ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <CreditCard className="w-4.5 h-4.5" />
                      Cartão de Crédito
                    </button>
                  </div>

                  {paymentMethod === "mbway" ? (
                    <div className="flex flex-col items-center bg-black/20 border border-white/[0.05] p-5 rounded-2xl space-y-4">
                      {/* MB WAY Badge & Summary */}
                      <div className="p-4 bg-gradient-to-br from-slate-900 to-black rounded-xl border border-brand-orange/30 w-full text-center space-y-2">
                        <div className="inline-block px-3 py-1 rounded bg-red-600 text-white font-black text-xs tracking-wider">
                          MB WAY
                        </div>
                        <p className="text-lg font-extrabold text-white">
                          € {price.toFixed(2).replace(".", ",")}
                        </p>
                        <p className="text-xs text-slate-400">
                          Pagamento seguro e imediato
                        </p>
                      </div>

                      <div className="w-full space-y-2">
                        <label className="block text-xs font-mono text-slate-300 uppercase">
                          Número de Telemóvel MB WAY
                        </label>
                        <input
                          type="tel"
                          value={phone || "+351 "}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+351 912 345 678"
                          className="w-full px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white text-sm focus:outline-none focus:border-brand-orange"
                        />
                        <p className="text-2xs text-slate-400">
                          Irá receber uma notificação na sua aplicação MB WAY para validar o pagamento dentro de 5 minutos.
                        </p>
                      </div>

                      {/* Verify simulated button */}
                      <button
                        onClick={handleVerifyPayment}
                        disabled={isVerifying}
                        className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-600/50 font-bold text-white text-sm transition-all cursor-pointer shadow-lg shadow-emerald-500/10 flex justify-center items-center gap-2"
                      >
                        {isVerifying ? (
                          <>
                            <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            A confirmar pagamento...
                          </>
                        ) : (
                          "Confirmar Pagamento MB WAY"
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Mock Credit Card Form */}
                      <div className="bg-gradient-to-br from-brand-card to-slate-900 border border-white/[0.06] p-5 rounded-2xl space-y-4">
                        <div className="flex justify-between items-center text-slate-400">
                          <span className="text-2xs font-mono uppercase tracking-widest font-semibold">CARTÃO DE CRÉDITO</span>
                          <CreditCard className="w-6 h-6 text-brand-orange" />
                        </div>
                        
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Número do Cartão</label>
                          <input
                            type="text"
                            placeholder="4444 5555 6666 7777"
                            disabled
                            className="w-full px-3.5 py-2.5 rounded-lg border border-white/[0.06] bg-black/40 text-slate-400 placeholder-slate-600 focus:outline-none text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Validade</label>
                            <input
                              type="text"
                              placeholder="MM/AA"
                              disabled
                              className="w-full px-3.5 py-2.5 rounded-lg border border-white/[0.06] bg-black/40 text-slate-400 placeholder-slate-600 focus:outline-none text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">CVC</label>
                            <input
                              type="text"
                              placeholder="123"
                              disabled
                              className="w-full px-3.5 py-2.5 rounded-lg border border-white/[0.06] bg-black/40 text-slate-400 placeholder-slate-600 focus:outline-none text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-xl p-3 text-xs text-brand-amber text-center">
                        Para testar o processo de encomenda, selecione a opção <strong>MB WAY</strong> e clique em &quot;Confirmar Pagamento MB WAY&quot;.
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {step === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-6 space-y-6"
                >
                  {/* Glowing success seal */}
                  <div className="flex justify-center">
                    <div className="relative w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                      <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
                      <CheckCircle2 className="w-8 h-8 relative z-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-2xs font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">
                      PAGAMENTO CONFIRMADO
                    </span>
                    <h3 className="text-2xl font-extrabold text-white font-display tracking-tight mt-3">
                      Acesso Ativo! 🎸
                    </h3>
                    <p className="text-sm text-slate-300 px-4">
                      Olá <strong>{name}</strong>, o seu pagamento de € {price.toFixed(2).replace(".", ",")} foi aprovado com sucesso. O material da sua <strong>Biblioteca de Frases para Contrabaixo</strong> já foi enviado.
                    </p>
                  </div>

                  {/* Mail instructions */}
                  <div className="mx-auto max-w-sm bg-black/30 border border-white/[0.05] p-4 rounded-xl text-left text-xs text-slate-400 space-y-2.5">
                    <div className="flex items-center gap-2 text-brand-amber font-semibold">
                      <Sparkles className="w-4 h-4 text-brand-orange" />
                      Próximos passos enviados para:
                    </div>
                    <div className="font-mono text-slate-200 select-all underline bg-white/[0.02] px-2 py-1 rounded border border-white/[0.03]">
                      {email}
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
                      <li>Verifique a sua caixa de entrada e a pasta de spam.</li>
                      <li>Descarregue as tablaturas completas em PDF e partituras.</li>
                      <li>Assista às aulas práticas no leitor exclusivo.</li>
                    </ul>
                  </div>

                  <button
                    onClick={resetModal}
                    className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 font-bold text-white text-base hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-emerald-500/15"
                  >
                    Voltar à Página Inicial
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
