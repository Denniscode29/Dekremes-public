// components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import AuthController from "../controllers/AuthController";
import defaultProfile from "../assets/profil.jpg";
import Swal from "sweetalert2";
import api from "../api/api";
import { Bell, Menu, X, CheckCircle, XCircle, Clock, MessageSquare, Star, User, LogOut, Check } from "lucide-react";

function Navbar({ title }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [navbarBackground, setNavbarBackground] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonialStatus, setTestimonialStatus] = useState(null);
  const [testimonialMessage, setTestimonialMessage] = useState(null);
  const [hasNewTestimonialNotification, setHasNewTestimonialNotification] = useState(false);
  const [showMarkAllReadConfirm, setShowMarkAllReadConfirm] = useState(false);

  const menuRef = useRef();
  const notificationsRef = useRef();
  const mobileMenuRef = useRef();
  const navigate = useNavigate();
  const lastScrollY = useRef(0);
  const location = useLocation();

  const solidBgRoutes = ["/tentang", "/blog", "/menu", "/kontak", "/testimoni"];

  // Auth state
  const isLoggedIn = AuthController((state) => state.isLoggedIn);
  const user = AuthController((state) => state.user);
  const logout = AuthController((state) => state.logout);
  const refreshUserStatus = AuthController((state) => state.refreshUserStatus);

  // Navigasi
  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      navigate(path);
      setMobileMenuOpen(false);
      setShowNotifications(false);
      setShowProfileMenu(false);
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications");
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get("/notifications/unread-count");
      setUnreadCount(response.data.count);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  // Check testimonial status dengan pesan notifikasi yang lebih baik
  const checkTestimonialStatus = async () => {
    try {
      const response = await api.get("/testimonials/check");
      const data = response.data;
      
      const previousStatus = testimonialStatus;
      setTestimonialStatus(data.testimonialStatus);
      setHasNewTestimonialNotification(data.hasNewNotification);
      
      // DETEKSI PERUBAHAN STATUS TESTIMONI
      if (data.hasNewNotification && data.notificationMessage) {
        setTestimonialMessage(data.notificationMessage);
        
        // Tampilkan SweetAlert hanya jika status berubah dan belum ditampilkan
        if (data.hasNewNotification && !localStorage.getItem(`notification_shown_${data.testimonial?.id}`)) {
          
          // Deteksi apakah status berubah dari sebelumnya
          const statusChanged = previousStatus !== data.testimonialStatus;
          
          if (statusChanged) {
            Swal.fire({
              title: '<div class="flex flex-col items-center">' +
                     '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">' +
                     '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                     '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>' +
                     '</svg>' +
                     '</div>' +
                     '<h3 class="text-xl font-bold text-gray-800 mb-2">Status Testimoni Diperbarui</h3>' +
                     '</div>',
              html: '<div class="text-center">' +
                    '<p class="text-gray-600">' + data.notificationMessage + '</p>' +
                    '</div>',
              confirmButtonText: "Lihat Testimoni",
              cancelButtonText: "Tutup",
              confirmButtonColor: "#3b82f6",
              cancelButtonColor: "#6b7280",
              background: "#fff",
              color: "#1f2937",
              customClass: {
                popup: 'rounded-2xl shadow-2xl border border-gray-200',
                confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200',
                cancelButton: 'py-3 px-6 rounded-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all duration-200'
              },
              showCancelButton: true,
              showCloseButton: true
            }).then((result) => {
              if (result.isConfirmed) {
                handleNavigation('/testimoni');
              }
              // Tandai notifikasi sudah ditampilkan
              if (data.testimonial?.id) {
                localStorage.setItem(`notification_shown_${data.testimonial.id}`, 'true');
              }
            });
          }
        }
      } else {
        setTestimonialMessage(null);
      }
    } catch (error) {
      console.error("Error checking testimonial status:", error);
    }
  };

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await api.post(`/notifications/${id}/read`);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, dibaca: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all as read dengan konfirmasi
  const markAllAsRead = async () => {
    try {
      await api.post("/notifications/read-all");
      setNotifications(prev => prev.map(n => ({ ...n, dibaca: true })));
      setUnreadCount(0);
      
      // Juga mark testimonial sebagai sudah dibaca
      await api.post("/testimonials/mark-notified");
      setTestimonialMessage(null);
      setHasNewTestimonialNotification(false);
      
      // Hapus flag notifikasi yang sudah ditampilkan
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('notification_shown_')) {
          localStorage.removeItem(key);
        }
      });
      
      // Tampilkan konfirmasi sukses
      setShowMarkAllReadConfirm(true);
      setTimeout(() => setShowMarkAllReadConfirm(false), 3000);
      
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  // Konfirmasi mark all as read dengan SweetAlert
  const confirmMarkAllAsRead = () => {
    Swal.fire({
      title: '<div class="flex flex-col items-center">' +
             '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">' +
             '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
             '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>' +
             '</svg>' +
             '</div>' +
             '<h3 class="text-xl font-bold text-gray-800 mb-2">Tandai Semua Dibaca?</h3>' +
             '</div>',
      html: '<div class="text-center">' +
            '<p class="text-gray-600">Semua notifikasi akan ditandai sebagai sudah dibaca</p>' +
            '</div>',
      showCancelButton: true,
      confirmButtonText: "Ya, Tandai Dibaca",
      cancelButtonText: "Batal",
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      background: "#fff",
      color: "#1f2937",
      customClass: {
        popup: 'rounded-2xl shadow-2xl border border-gray-200',
        confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200',
        cancelButton: 'py-3 px-6 rounded-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all duration-200'
      },
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        markAllAsRead();
      }
    });
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'testimonial_approved':
        return <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />;
      case 'testimonial_rejected':
        return <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />;
      case 'testimonial_submitted':
      case 'testimonial_updated':
      case 'testimonial_pending':
        return <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0" />;
      default:
        return <MessageSquare className="w-5 h-5 text-blue-500 flex-shrink-0" />;
    }
  };

  // Get notification background color
  const getNotificationBgColor = (notification) => {
    if (!notification.dibaca) {
      switch (notification.type) {
        case 'testimonial_approved':
          return "bg-green-50 border-l-4 border-l-green-500";
        case 'testimonial_rejected':
          return "bg-red-50 border-l-4 border-l-red-500";
        case 'testimonial_submitted':
        case 'testimonial_updated':
        case 'testimonial_pending':
          return "bg-yellow-50 border-l-4 border-l-yellow-500";
        default:
          return "bg-blue-50 border-l-4 border-l-blue-500";
      }
    }
    return "bg-white hover:bg-gray-50";
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        return 'Hari ini ' + date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      } else if (diffDays === 2) {
        return 'Kemarin ' + date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      } else if (diffDays <= 7) {
        return `${diffDays - 1} hari lalu`;
      }
      
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Tanggal tidak valid";
    }
  };

  // Refresh data saat mount dan login status berubah
  useEffect(() => {
    if (isLoggedIn) {
      refreshUserStatus();
      fetchNotifications();
      fetchUnreadCount();
      checkTestimonialStatus();

      // Setup polling setiap 30 detik
      const interval = setInterval(() => {
        fetchNotifications();
        fetchUnreadCount();
        checkTestimonialStatus();
      }, 30000);

      return () => clearInterval(interval);
    } else {
      setNotifications([]);
      setUnreadCount(0);
      setTestimonialStatus(null);
      setTestimonialMessage(null);
      setHasNewTestimonialNotification(false);
    }
  }, [isLoggedIn]);

  // Update unread count ketika notifications berubah
  useEffect(() => {
    const unread = notifications.filter(notif => !notif.dibaca).length;
    setUnreadCount(unread);
  }, [notifications]);

  // Logout function untuk mobile
  const handleMobileLogout = () => {
    Swal.fire({
      title: '<div class="flex flex-col items-center">' +
             '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">' +
             '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
             '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>' +
             '</svg>' +
             '</div>' +
             '<h3 class="text-xl font-bold text-gray-800 mb-2">Konfirmasi Logout</h3>' +
             '</div>',
      html: '<div class="text-center">' +
            '<p class="text-gray-600">Anda yakin ingin keluar dari akun?</p>' +
            '</div>',
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6b7280",
      background: "#fff",
      color: "#1f2937",
      customClass: {
        popup: 'rounded-2xl shadow-2xl border border-gray-200',
        confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200',
        cancelButton: 'py-3 px-6 rounded-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all duration-200'
      },
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  // Logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    Swal.fire({
      title: '<div class="flex flex-col items-center">' +
             '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">' +
             '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
             '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>' +
             '</svg>' +
             '</div>' +
             '<h3 class="text-xl font-bold text-gray-800 mb-2">Logging out...</h3>' +
             '</div>',
      html: '<div class="text-center">' +
            '<p class="text-gray-600">Sedang memproses logout...</p>' +
            '</div>',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
      background: "#fff",
      color: "#1f2937",
      customClass: {
        popup: 'rounded-2xl shadow-2xl border border-gray-200'
      }
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      logout();
      setShowProfileMenu(false);
      setShowNotifications(false);
      setMobileMenuOpen(false);
      Swal.close();
      
      // Tampilkan alert sukses logout
      await Swal.fire({
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Logout Berhasil</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">Anda berhasil logout dari akun.</p>' +
              '</div>',
        confirmButtonText: "Lanjutkan",
        confirmButtonColor: "#10b981",
        background: "#fff",
        color: "#1f2937",
        customClass: {
          popup: 'rounded-2xl shadow-2xl border border-gray-200',
          confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
        },
        timer: 2000,
        timerProgressBar: true,
        showCloseButton: true
      });
      
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      Swal.fire({
        title: '<div class="flex flex-col items-center">' +
               '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">' +
               '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
               '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' +
               '</svg>' +
               '</div>' +
               '<h3 class="text-xl font-bold text-gray-800 mb-2">Logout Gagal</h3>' +
               '</div>',
        html: '<div class="text-center">' +
              '<p class="text-gray-600">Terjadi kesalahan saat logout. Silakan coba lagi.</p>' +
              '</div>',
        confirmButtonText: "Coba Lagi",
        confirmButtonColor: "#ef4444",
        background: "#fff",
        color: "#1f2937",
        customClass: {
          popup: 'rounded-2xl shadow-2xl border border-gray-200',
          confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
        },
        showCloseButton: true
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Klik luar → close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll kontrol navbar
  const controlNavbar = useCallback(() => {
    const currentScrollY = window.scrollY;
    setNavbarBackground(currentScrollY > 50);

    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      setNavbarVisible(false);
    } else {
      setNavbarVisible(true);
    }

    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [controlNavbar]);

  // Menu items
  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Tentang", path: "/tentang" },
    { name: "Menu", path: "/menu" },
    { name: "Kontak", path: "/kontak" },
    { name: "Testimoni", path: "/testimoni" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ease-out
          ${navbarVisible ? "translate-y-0" : "-translate-y-full"}
          ${
            navbarBackground || solidBgRoutes.includes(location.pathname)
              ? "bg-[#FFFFFF] shadow-lg backdrop-blur-sm bg-opacity-95"
              : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8">
          {/* Logo - DIUBAH: Menggunakan flex-1 dan text-center untuk spacing yang lebih baik */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <Link
              to="/"
              className={`font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-wide transition-all duration-500 ease-in-out hover:scale-105 transform relative group ${
                navbarBackground || solidBgRoutes.includes(location.pathname)
                  ? "text-gray-800"
                  : "text-white drop-shadow-lg"
              }`}
            >
              {title}
              {/* Garis bawah animasi */}
              <span 
                className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B80002] transition-all duration-500 ease-out group-hover:w-full ${
                  navbarBackground || solidBgRoutes.includes(location.pathname)
                    ? "bg-[#B80002]"
                    : "bg-[#FFD700]"
                }`}
              ></span>
            </Link>
          </div>

          {/* Desktop Menu - DIUBAH: Menggunakan flex-1 dan justify-center untuk center positioning */}
          <div className="hidden lg:flex flex-1 justify-center items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`relative font-semibold transition-all duration-300 group py-2 px-1 ${
                  location.pathname === item.path
                    ? navbarBackground || solidBgRoutes.includes(location.pathname)
                      ? "text-[#B80002]"
                      : "text-[#FFD700] drop-shadow-md"
                    : navbarBackground || solidBgRoutes.includes(location.pathname)
                      ? "text-gray-700 hover:text-[#B80002]"
                      : "text-white hover:text-[#FFD700] drop-shadow-lg"
                }`}
              >
                {item.name}
                <span 
                  className={`absolute left-0 bottom-0 h-0.5 bg-[#B80002] transition-all duration-300 ${
                    location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Auth Section - Desktop - DIUBAH: Menggunakan flex-1 dan justify-end */}
          <div className="hidden lg:flex flex-1 justify-end items-center space-x-4 relative" ref={menuRef}>
            {!isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  onClick={() => handleNavigation("/login")}
                  className={`px-5 py-2.5 rounded-xl transition-all font-semibold border-2 duration-300 hover:scale-105 ${
                    navbarBackground || solidBgRoutes.includes(location.pathname)
                      ? "bg-[#B80002] text-white hover:bg-[#a00002] border-transparent"
                      : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border-white/30"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => handleNavigation("/register")}
                  className="px-5 py-2.5 rounded-xl bg-[#B80002] text-white hover:bg-[#a00002] transition-all font-semibold border-2 border-transparent hover:scale-105 duration-300"
                >
                  Daftar
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                  <button
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowProfileMenu(false);
                    }}
                    className={`relative p-2.5 rounded-xl transition-all duration-300 hover:scale-105 ${
                      navbarBackground || solidBgRoutes.includes(location.pathname)
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white hover:bg-white/20"
                    } ${showNotifications ? 'bg-white/30' : ''}`}
                  >
                    <Bell className="w-6 h-6" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#B80002] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 top-14 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-fadeIn">
                      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 text-lg">Notifikasi</h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={confirmMarkAllAsRead}
                            className="text-sm text-[#B80002] hover:text-[#a00002] font-semibold px-3 py-1 rounded-lg hover:bg-red-50 transition-colors flex items-center space-x-1"
                          >
                            <Check className="w-4 h-4" />
                            <span>Tandai semua dibaca</span>
                          </button>
                        )}
                      </div>
                      <div className="max-h-96 overflow-y-auto custom-scrollbar">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md ${getNotificationBgColor(notification)}`}
                              onClick={() => {
                                markAsRead(notification.id);
                                if (notification.testimonial_id) {
                                  handleNavigation('/testimoni');
                                }
                                setShowNotifications(false);
                              }}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-gray-800 text-sm leading-relaxed break-words">
                                    {notification.pesan}
                                  </p>
                                  <div className="flex items-center justify-between mt-2">
                                    <p className="text-xs text-gray-500">
                                      {formatDate(notification.created_at)}
                                    </p>
                                    {notification.testimonial_id && (
                                      <span className="inline-flex items-center px-2 py-1 text-xs bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-full font-medium">
                                        Testimoni
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {!notification.dibaca && (
                                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2 animate-pulse"></div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-500">
                            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p className="text-gray-600">Tidak ada notifikasi</p>
                            <p className="text-sm text-gray-400 mt-1">Notifikasi baru akan muncul di sini</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowProfileMenu(!showProfileMenu);
                      setShowNotifications(false);
                    }}
                    className="relative focus:outline-none"
                  >
                    <img
                      src={user?.avatar_url || defaultProfile}
                      alt="Profile"
                      className={`w-10 h-10 rounded-full cursor-pointer border-2 transition-all duration-300 object-cover hover:scale-105 ${
                        showProfileMenu
                          ? "border-[#B80002] shadow-lg"
                          : "border-gray-300 hover:border-[#B80002]"
                      }`}
                    />
                    {/* Indicator untuk testimonial message */}
                    {(hasNewTestimonialNotification || testimonialMessage) && !showProfileMenu && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-ping"></div>
                    )}
                  </button>
                  
                  {showProfileMenu && (
                    <div className="absolute right-0 top-14 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 animate-scaleIn">
                      {/* Header dengan info user */}
                      <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white rounded-t-2xl">
                        <div className="flex items-center space-x-4">
                          <img
                            src={user?.avatar_url || defaultProfile}
                            alt="Profile"
                            className="w-14 h-14 rounded-full border-3 border-white shadow-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-800 font-bold text-lg truncate">
                              {user?.name || "User"}
                            </p>
                            <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                          </div>
                        </div>
                        
                        {/* Status Testimoni */}
                        {testimonialStatus && (
                          <div className="mt-4 p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-gray-700">Status Testimoni:</span>
                              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                testimonialStatus === 'Disetujui' ? 'bg-green-100 text-green-800' :
                                testimonialStatus === 'Ditolak' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {testimonialStatus}
                              </span>
                            </div>
                            {/* Tampilkan pesan testimonial jika ada */}
                            {testimonialMessage && (
                              <p className="text-xs text-gray-600 line-clamp-2 bg-gray-50 p-2 rounded-lg">
                                {testimonialMessage}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Menu Items */}
                      <div className="p-3">
                        <button
                          onClick={() => {
                            setShowProfileMenu(false);
                            handleNavigation("/profile");
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 mb-2 hover:translate-x-1"
                        >
                          <User className="w-5 h-5 text-gray-500" />
                          <span>Lihat Profil</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            setShowProfileMenu(false);
                            handleNavigation("/testimoni");
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 mb-2 hover:translate-x-1"
                        >
                          <Star className="w-5 h-5 text-yellow-500" />
                          <span>Testimoni Saya</span>
                          {hasNewTestimonialNotification && (
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                          )}
                        </button>

                        {(hasNewTestimonialNotification || unreadCount > 0) && (
                          <button
                            onClick={() => {
                              setShowProfileMenu(false);
                              confirmMarkAllAsRead();
                            }}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 mb-2 hover:translate-x-1"
                          >
                            <CheckCircle className="w-5 h-5" />
                            <span>Tandai Sudah Dibaca</span>
                          </button>
                        )}

                        <div className="border-t border-gray-200 my-3"></div>

                        <button
                          onClick={handleMobileLogout}
                          disabled={isLoggingOut}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-all duration-200 disabled:opacity-50 hover:translate-x-1"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Section - Auth + Hamburger - DIUBAH: Menggunakan flex-1 dan justify-end */}
          <div className="flex lg:hidden flex-1 justify-end items-center space-x-3">
            {/* Mobile Notifications - hanya jika logged in */}
            {isLoggedIn && (
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowProfileMenu(false);
                  }}
                  className={`relative p-2.5 rounded-xl transition-all duration-300 ${
                    navbarBackground || solidBgRoutes.includes(location.pathname)
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-white hover:bg-white/20"
                  } ${showNotifications ? 'bg-white/30' : ''}`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#B80002] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px] animate-pulse">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setShowNotifications(false)}>
                    <div 
                      className="absolute right-0 top-20 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 mx-4 animate-slideIn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 flex justify-between items-center rounded-t-2xl">
                        <h3 className="font-bold text-gray-800">Notifikasi</h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={confirmMarkAllAsRead}
                            className="text-sm text-[#B80002] hover:text-[#a00002] font-semibold flex items-center space-x-1"
                          >
                            <Check className="w-4 h-4" />
                            <span>Tandai semua dibaca</span>
                          </button>
                        )}
                      </div>
                      <div className="max-h-80 overflow-y-auto custom-scrollbar">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${getNotificationBgColor(notification)}`}
                              onClick={() => {
                                markAsRead(notification.id);
                                if (notification.testimonial_id) {
                                  handleNavigation('/testimoni');
                                }
                                setShowNotifications(false);
                              }}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-gray-800 text-sm leading-relaxed break-words">
                                    {notification.pesan}
                                  </p>
                                  <div className="flex items-center justify-between mt-2">
                                    <p className="text-xs text-gray-500">
                                      {formatDate(notification.created_at)}
                                    </p>
                                    {notification.testimonial_id && (
                                      <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                        Testimoni
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {!notification.dibaca && (
                                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2 animate-pulse"></div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-6 text-center text-gray-500">
                            <MessageSquare className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                            <p className="text-gray-600">Tidak ada notifikasi</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Logout Button - Visible ketika logged in di mobile */}
            {isLoggedIn && (
              <button
                onClick={handleMobileLogout}
                className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
                  navbarBackground || solidBgRoutes.includes(location.pathname)
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/20"
                }`}
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}

            {/* Hamburger Menu Button */}
            <button
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                navbarBackground || solidBgRoutes.includes(location.pathname)
                  ? "text-gray-800 hover:bg-gray-100"
                  : "text-white hover:bg-white/20"
              } ${mobileMenuOpen ? 'bg-white/30' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-0 left-0 w-6 h-0.5 bg-current transition-all duration-300 transform ${
                    mobileMenuOpen ? 'rotate-45 translate-y-2.5' : 'rotate-0 translate-y-0'
                  }`}
                />
                <span
                  className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute top-5 left-0 w-6 h-0.5 bg-current transition-all duration-300 transform ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : 'rotate-0 translate-y-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileMenuOpen 
            ? 'bg-black/50 backdrop-blur-sm visible opacity-100' 
            : 'bg-transparent invisible opacity-0'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu - DIUBAH: Perbaikan tinggi dan spacing untuk mobile */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#FFF5CC] shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="bg-gradient-to-r from-[#B80002] to-[#a00002] p-6 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{title}</h3>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Content - DIUBAH: Menggunakan flex-1 dan overflow untuk konten yang scrollable */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* User Info - jika logged in */}
          {isLoggedIn && (
            <div className="p-4 border-b border-gray-200 bg-white/50 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar_url || defaultProfile}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-semibold truncate text-sm">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                </div>
              </div>
              
              {/* Status Testimoni - Mobile */}
              {testimonialStatus && (
                <div className="mt-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700">Status Testimoni:</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      testimonialStatus === 'Disetujui' ? 'bg-green-100 text-green-800' :
                      testimonialStatus === 'Ditolak' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {testimonialStatus}
                    </span>
                  </div>
                  {testimonialMessage && (
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {testimonialMessage}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation Menu - DIUBAH: Menggunakan overflow-auto untuk konten yang bisa di-scroll */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center px-4 py-4 rounded-xl text-gray-800 font-semibold transition-all duration-200 ${
                    location.pathname === item.path 
                      ? 'bg-[#B80002] text-white shadow-lg transform scale-105' 
                      : 'hover:bg-yellow-300 active:scale-95'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* User Menu Items - Mobile */}
              {isLoggedIn && (
                <>
                  <div className="border-t border-gray-200 my-4"></div>
                  
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleNavigation("/profile");
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-4 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <User className="w-5 h-5 text-gray-500" />
                    <span>Lihat Profil</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleNavigation("/testimoni");
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-4 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span>Testimoni Saya</span>
                    {hasNewTestimonialNotification && (
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                  </button>

                  {(hasNewTestimonialNotification || unreadCount > 0) && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        confirmMarkAllAsRead();
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-4 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Tandai Sudah Dibaca</span>
                    </button>
                  )}

                  {/* Mobile Logout Button - DIUBAH: Ditambahkan margin top untuk spacing yang lebih baik */}
                  <button
                    onClick={handleMobileLogout}
                    disabled={isLoggingOut}
                    className="w-full flex items-center space-x-3 px-4 py-4 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-all duration-200 disabled:opacity-50 mt-6 border border-red-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Footer - untuk yang belum login - DIUBAH: Ditambahkan padding bottom yang lebih besar */}
          {!isLoggedIn && (
            <div className="p-6 border-t border-gray-200 bg-white/50 flex-shrink-0">
              <div className="space-y-4">
                <Link
                  to="/login"
                  onClick={() => handleNavigation("/login")}
                  className="block w-full px-4 py-4 rounded-xl bg-[#B80002] text-white text-center font-semibold hover:bg-[#a00002] transition-all duration-200 hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => handleNavigation("/register")}
                  className="block w-full px-4 py-4 rounded-xl border-2 border-[#B80002] text-[#B80002] text-center font-semibold hover:bg-[#B80002] hover:text-white transition-all duration-200 hover:scale-105"
                >
                  Daftar
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification untuk Mark All Read */}
      {showMarkAllReadConfirm && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl animate-slideIn">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Semua notifikasi telah ditandai dibaca</span>
          </div>
        </div>
      )}

      {/* Tambahkan style untuk custom scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default Navbar;