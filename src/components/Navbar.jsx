// components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import AuthController from "../controllers/AuthController";
import defaultProfile from "../assets/profil.jpg";
import Swal from "sweetalert2";
import api from "../api/api";
import { Bell, Menu, X, CheckCircle, XCircle, Clock, MessageSquare, Star, User, LogOut } from "lucide-react";

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

  const menuRef = useRef();
  const notificationsRef = useRef();
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

  // Check testimonial status dengan pesan notifikasi
  const checkTestimonialStatus = async () => {
    try {
      const response = await api.get("/testimonials/check");
      const data = response.data;
      
      setTestimonialStatus(data.testimonialStatus);
      setHasNewTestimonialNotification(data.hasNewNotification);
      
      // TAMPILKAN PESAN NOTIFIKASI JIKA ADA DAN BELUM DIBACA
      if (data.hasNewNotification && data.notificationMessage) {
        setTestimonialMessage(data.notificationMessage);
        
        // Tampilkan SweetAlert untuk notifikasi baru (hanya sekali)
        if (data.hasNewNotification && !localStorage.getItem(`notification_shown_${data.testimonial?.id}`)) {
          Swal.fire({
            icon: getNotificationIconType(data.testimonialStatus),
            title: getNotificationTitle(data.testimonialStatus),
            text: data.notificationMessage,
            timer: 6000,
            showConfirmButton: true,
            confirmButtonText: 'Lihat Testimoni',
            showCancelButton: true,
            cancelButtonText: 'Tutup',
            customClass: {
              popup: 'rounded-2xl shadow-2xl',
              confirmButton: 'bg-[#B80002] hover:bg-[#A00002] px-4 py-2 rounded-lg font-semibold',
              cancelButton: 'bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-semibold'
            }
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
      } else {
        setTestimonialMessage(null);
      }
    } catch (error) {
      console.error("Error checking testimonial status:", error);
    }
  };

  // Helper functions untuk notifikasi
  const getNotificationIconType = (status) => {
    switch (status) {
      case 'Disetujui': return 'success';
      case 'Ditolak': return 'error';
      case 'Menunggu': return 'info';
      default: return 'info';
    }
  };

  const getNotificationTitle = (status) => {
    switch (status) {
      case 'Disetujui': return 'Testimoni Disetujui! 🎉';
      case 'Ditolak': return 'Testimoni Ditolak';
      case 'Menunggu': return 'Testimoni Dikirim';
      default: return 'Status Testimoni';
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

  // Mark all as read
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
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'testimonial_approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'testimonial_rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'testimonial_submitted':
      case 'testimonial_updated':
      case 'testimonial_pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
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
    return "bg-white";
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
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

  // Logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    Swal.fire({
      title: "Logging out...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      logout();
      setShowProfileMenu(false);
      setShowNotifications(false);
      Swal.close();
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Terjadi kesalahan saat logout. Silakan coba lagi.",
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
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll kontrol navbar
  const controlNavbar = useCallback(() => {
    setNavbarBackground(window.scrollY > 50);

    if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
      setNavbarVisible(false);
    } else {
      setNavbarVisible(true);
    }

    lastScrollY.current = window.scrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [controlNavbar]);

  // Menu items
  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Tentang", path: "/tentang" },
    { name: "Blog", path: "/blog" },
    { name: "Menu", path: "/menu" },
    { name: "Kontak", path: "/kontak" },
    { name: "Testimoni", path: "/testimoni" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 
        ${navbarVisible ? "translate-y-0" : "-translate-y-full"}
        ${
          navbarBackground || solidBgRoutes.includes(location.pathname)
            ? "bg-[#FFF5CC] shadow-lg"
            : "bg-transparent"
        }`}
    >
      <div className="flex justify-between items-center py-4 px-6 md:px-12">
        {/* Logo */}
        <div
          className={`font-extrabold text-2xl md:text-3xl tracking-wide transition-colors duration-300 ${
            navbarBackground || solidBgRoutes.includes(location.pathname)
              ? "text-gray-800"
              : "text-white"
          }`}
        >
          {title}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`relative font-semibold transition duration-300 group ${
                navbarBackground || solidBgRoutes.includes(location.pathname)
                  ? "text-black hover:text-[#B80002]"
                  : "text-white hover:text-[#FFD700]"
              }`}
            >
              {item.name}
              <span className="absolute left-0 bottom-[-6px] w-0 h-[2px] bg-[#B80002] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${
            navbarBackground ? "text-gray-800" : "text-white"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Auth Section */}
        <div className="flex items-center space-x-4 relative" ref={menuRef}>
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                onClick={() => handleNavigation("/login")}
                className={`px-5 py-2 rounded-lg transition font-semibold ${
                  navbarBackground || solidBgRoutes.includes(location.pathname)
                    ? "bg-[#B80002] text-white hover:bg-[#a00002]"
                    : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => handleNavigation("/register")}
                className="px-5 py-2 rounded-lg bg-[#B80002] text-white hover:bg-[#a00002] transition font-semibold"
              >
                Daftar
              </Link>
            </>
          ) : (
            <div className="relative">
              {/* Notifications */}
              <div className="absolute -left-12 top-1" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-2 rounded-full transition ${
                    navbarBackground || solidBgRoutes.includes(location.pathname)
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#B80002] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">Notifikasi</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-[#B80002] hover:underline font-medium"
                        >
                          Tandai semua dibaca
                        </button>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${getNotificationBgColor(notification)}`}
                            onClick={() => {
                              markAsRead(notification.id);
                              if (notification.testimonial_id) {
                                handleNavigation('/testimoni');
                                setShowNotifications(false);
                              }
                            }}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-1">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-gray-800 text-sm leading-relaxed break-words">
                                  {notification.pesan}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {formatDate(notification.created_at)}
                                </p>
                                {notification.testimonial_id && (
                                  <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                    Testimoni
                                  </span>
                                )}
                              </div>
                              {!notification.dibaca && (
                                <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p>Tidak ada notifikasi</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative">
                <img
                  src={user?.avatar_url || defaultProfile}
                  alt="Profile"
                  className={`w-10 h-10 rounded-full cursor-pointer border-2 transition-all duration-300 ${
                    showProfileMenu
                      ? "border-[#B80002] scale-105"
                      : "border-gray-300 hover:border-[#B80002]"
                  }`}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                />
                {/* Indicator untuk testimonial message */}
                {(hasNewTestimonialNotification || testimonialMessage) && !showProfileMenu && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-ping"></div>
                )}
              </div>
              
              {showProfileMenu && (
                <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-fadeIn">
                  {/* Header dengan info user */}
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user?.avatar_url || defaultProfile}
                        alt="Profile"
                        className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 font-semibold truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                      </div>
                    </div>
                    
                    {/* Status Testimoni */}
                    {testimonialStatus && (
                      <div className="mt-3 p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-700">Status Testimoni:</span>
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            testimonialStatus === 'Disetujui' ? 'bg-green-100 text-green-800' :
                            testimonialStatus === 'Ditolak' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {testimonialStatus}
                          </span>
                        </div>
                        {/* Tampilkan pesan testimonial jika ada */}
                        {testimonialMessage && (
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {testimonialMessage}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        handleNavigation("/profile");
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors mb-1"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      <span>Edit Profil</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        handleNavigation("/testimoni");
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors mb-1"
                    >
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>Testimoni Saya</span>
                      {hasNewTestimonialNotification && (
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                    </button>

                    {(hasNewTestimonialNotification || unreadCount > 0) && (
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          markAllAsRead();
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors mb-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Tandai Sudah Dibaca</span>
                      </button>
                    )}

                    <div className="border-t border-gray-200 my-2"></div>

                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF5CC] shadow-lg px-6 py-4 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => handleNavigation(item.path)}
              className="block text-gray-800 font-semibold hover:text-[#B80002] transition-colors py-2"
            >
              {item.name}
            </Link>
          ))}

          {!isLoggedIn ? (
            <div className="flex flex-col space-y-2 pt-4">
              <Link
                to="/login"
                onClick={() => handleNavigation("/login")}
                className="px-5 py-3 rounded-lg bg-[#B80002] text-white text-center font-semibold hover:bg-[#a00002] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => handleNavigation("/register")}
                className="px-5 py-3 rounded-lg bg-[#FFD700] text-black text-center font-semibold hover:bg-[#e6c200] transition"
              >
                Daftar
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-300">
              <div className="flex items-center space-x-3 mb-4 p-3 bg-white rounded-lg shadow-sm">
                <img
                  src={user?.avatar_url || defaultProfile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                />
                <div>
                  <p className="font-semibold text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full bg-[#B80002] text-white py-3 rounded-lg hover:bg-[#a00002] transition font-semibold disabled:opacity-70"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;